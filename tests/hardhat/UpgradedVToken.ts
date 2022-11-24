import { FakeContract, smock } from "@defi-wonderland/smock";
import { expect } from "chai";
import { ethers } from "hardhat";

import { convertToUnit } from "../../helpers/utils";
import {
  AccessControlManager,
  Comptroller,
  JumpRateModelFactory,
  MockPriceOracle,
  MockToken,
  PoolRegistry,
  ProtocolShareReserve,
  RiskFund,
  TransparentUpgradeableProxy,
  VToken,
  VTokenProxyFactory,
  WhitePaperInterestRateModelFactory,
} from "../../typechain";

let poolRegistry: PoolRegistry;
let comptroller1: Comptroller;
let comptroller1Proxy: Comptroller;
let mockWBTC: MockToken;
let vWBTC: VToken;
let priceOracle: MockPriceOracle;
let vTokenFactory: VTokenProxyFactory;
let jumpRateFactory: JumpRateModelFactory;
let whitePaperRateFactory: WhitePaperInterestRateModelFactory;
let fakeAccessControlManager: FakeContract<AccessControlManager>;
let protocolShareReserve: ProtocolShareReserve;
let riskFund: RiskFund;
let transparentProxy: TransparentUpgradeableProxy;

describe("UpgradedVToken: Tests", function () {
  /**
   * Deploying required contracts along with the poolRegistry.
   */
  let proxyAdmin;
  before(async function () {
    [, proxyAdmin] = await ethers.getSigners();
    const VTokenProxyFactory = await ethers.getContractFactory("VTokenProxyFactory");
    vTokenFactory = await VTokenProxyFactory.deploy();
    await vTokenFactory.deployed();

    const JumpRateModelFactory = await ethers.getContractFactory("JumpRateModelFactory");
    jumpRateFactory = await JumpRateModelFactory.deploy();
    await jumpRateFactory.deployed();

    const WhitePaperInterestRateModelFactory = await ethers.getContractFactory("WhitePaperInterestRateModelFactory");
    whitePaperRateFactory = await WhitePaperInterestRateModelFactory.deploy();
    await whitePaperRateFactory.deployed();

    const PoolRegistry = await ethers.getContractFactory("PoolRegistry");
    poolRegistry = await PoolRegistry.deploy();
    await poolRegistry.deployed();

    const Shortfall = await ethers.getContractFactory("Shortfall");
    const shortfall = await Shortfall.deploy();

    await shortfall.initialize(ethers.constants.AddressZero, ethers.constants.AddressZero, convertToUnit("10000", 18));
    const RiskFund = await ethers.getContractFactory("RiskFund");
    riskFund = await RiskFund.deploy();
    await riskFund.deployed();

    const ProtocolShareReserve = await ethers.getContractFactory("ProtocolShareReserve");
    protocolShareReserve = await ProtocolShareReserve.deploy();
    await protocolShareReserve.deployed();

    await poolRegistry.initialize(
      vTokenFactory.address,
      jumpRateFactory.address,
      whitePaperRateFactory.address,
      shortfall.address,
      riskFund.address,
      protocolShareReserve.address,
    );

    await shortfall.setPoolRegistry(poolRegistry.address);

    fakeAccessControlManager = await smock.fake<AccessControlManager>("AccessControlManager");
    fakeAccessControlManager.isAllowedToCall.returns(true);

    const Comptroller = await ethers.getContractFactory("Comptroller");
    comptroller1 = await Comptroller.deploy(poolRegistry.address, fakeAccessControlManager.address);
    await comptroller1.deployed();

    // Deploy Mock Tokens
    const MockWBTC = await ethers.getContractFactory("MockToken");
    mockWBTC = await MockWBTC.deploy("Bitcoin", "BTC", 8);

    const _closeFactor = convertToUnit(0.05, 18);
    const _liquidationIncentive = convertToUnit(1, 18);
    const _minLiquidatableCollateral = convertToUnit(100, 18);

    // Deploy Price Oracle
    const MockPriceOracle = await ethers.getContractFactory("MockPriceOracle");
    priceOracle = await MockPriceOracle.deploy();

    const btcPrice = "21000.34";

    await priceOracle.setPrice(mockWBTC.address, convertToUnit(btcPrice, 28));

    // Registering the first pool
    await poolRegistry.createRegistryPool(
      "Pool 1",
      proxyAdmin.address,
      comptroller1.address,
      _closeFactor,
      _liquidationIncentive,
      _minLiquidatableCollateral,
      priceOracle.address,
    );

    // Setup Proxies
    const pools = await poolRegistry.callStatic.getAllPools();
    comptroller1Proxy = await ethers.getContractAt("Comptroller", pools[0].comptroller);

    await comptroller1Proxy.acceptAdmin();

    const VToken = await ethers.getContractFactory("VToken");
    const tokenImplementation = await VToken.deploy();
    await tokenImplementation.deployed();

    // Deploy VTokens
    await poolRegistry.addMarket({
      comptroller: pools[0].comptroller,
      asset: mockWBTC.address,
      decimals: 8,
      name: "Compound WBTC",
      symbol: "vWBTC",
      rateModel: 0,
      baseRatePerYear: 0,
      multiplierPerYear: "40000000000000000",
      jumpMultiplierPerYear: 0,
      kink_: 0,
      collateralFactor: convertToUnit(0.7, 18),
      liquidationThreshold: convertToUnit(0.7, 18),
      accessControlManager: fakeAccessControlManager.address,
      vTokenProxyAdmin: proxyAdmin.address,
      tokenImplementation_: tokenImplementation.address,
    });

    const vWBTCAddress = await poolRegistry.getVTokenForAsset(pools[0].comptroller, mockWBTC.address);

    vWBTC = await ethers.getContractAt("VToken", vWBTCAddress);
  });

  it("Upgrade the vToken contract", async function () {
    const vToken = await ethers.getContractFactory("UpgradedVToken");
    const vTokenDeploy = await vToken.deploy();
    await vTokenDeploy.deployed();

    transparentProxy = await ethers.getContractAt("TransparentUpgradeableProxy", vWBTC.address);
    await transparentProxy.connect(proxyAdmin).upgradeTo(vTokenDeploy.address);

    const upgradeTo = await transparentProxy.connect(proxyAdmin).callStatic.implementation();
    expect(upgradeTo).to.be.equal(vTokenDeploy.address);
  });
});