import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { getConfig } from "../helpers/deploymentConfig";
import { toAddress } from "../helpers/deploymentUtils";
import { convertToUnit } from "../helpers/utils";

const MIN_POOL_BAD_DEBT = convertToUnit(1000, 18);

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const { preconfiguredAddresses } = await getConfig(hre.network.name);

  const poolRegistry = await ethers.getContract("PoolRegistry");
  const deployerSigner = ethers.provider.getSigner(deployer);
  const accessControlManagerAddress = await toAddress(
    preconfiguredAddresses.AccessControlManager || "AccessControlManager",
    hre,
  );
  const proxyAdmin = await ethers.getContract("DefaultProxyAdmin");
  const owner = await proxyAdmin.owner();

  const riskFund = await ethers.getContract("RiskFundV2");

  await deploy("Shortfall", {
    from: deployer,
    contract: "Shortfall",
    proxy: {
      owner: owner,
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        methodName: "initialize",
        args: [riskFund.address, MIN_POOL_BAD_DEBT, accessControlManagerAddress],
      },
      upgradeIndex: 0,
    },
    autoMine: true,
    log: true,
  });

  const shortfall = await ethers.getContract("Shortfall");
  if ((await shortfall.poolRegistry()) !== poolRegistry.address) {
    console.log("Setting PoolRegistry address in Shortfall contract");
    const tx = await shortfall.connect(deployerSigner).updatePoolRegistry(poolRegistry.address);
    await tx.wait();
  }

  const targetOwner = preconfiguredAddresses.NormalTimelock || deployer;
  for (const contractName of ["Shortfall"]) {
    const contract = await ethers.getContract(contractName);
    if ((await contract.owner()) !== targetOwner && (await contract.pendingOwner()) !== targetOwner) {
      console.log(`Transferring ownership of ${contractName} to ${targetOwner}`);
      const tx = await contract.transferOwnership(targetOwner);
      await tx.wait();
    }
  }
};
func.tags = ["Shortfall", "il"];

export default func;
