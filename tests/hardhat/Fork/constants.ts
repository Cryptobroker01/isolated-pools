import GovernanceArbSep from "@venusprotocol/governance-contracts/deployments/arbitrumsepolia.json";
import GovernanceBscMainnet from "@venusprotocol/governance-contracts/deployments/bscmainnet.json";
import GovernanceBscTestnet from "@venusprotocol/governance-contracts/deployments/bsctestnet.json";
import GovernanceEthMainnet from "@venusprotocol/governance-contracts/deployments/ethereum.json";
import GovernanceOpBnbMainnet from "@venusprotocol/governance-contracts/deployments/opbnbmainnet.json";
import GovernanceOpBnbTestnet from "@venusprotocol/governance-contracts/deployments/opbnbtestnet.json";
import GovernanceSepTestnet from "@venusprotocol/governance-contracts/deployments/sepolia.json";
import OracleArbSep from "@venusprotocol/oracle/deployments/arbitrumsepolia.json";
import OracleBscMainnet from "@venusprotocol/oracle/deployments/bscmainnet.json";
import OracleBscTestnet from "@venusprotocol/oracle/deployments/bsctestnet.json";
import OracleEthMainnet from "@venusprotocol/oracle/deployments/ethereum.json";
import OracleOpBnbMainnet from "@venusprotocol/oracle/deployments/opbnbmainnet.json";
import OracleOpBnbTestnet from "@venusprotocol/oracle/deployments/opbnbtestnet.json";
import OracleSepTestnet from "@venusprotocol/oracle/deployments/sepolia.json";
import PsrArbSep from "@venusprotocol/protocol-reserve/deployments/arbitrumsepolia.json";
import PsrBscMainnet from "@venusprotocol/protocol-reserve/deployments/bscmainnet.json";
import PsrBscTestnet from "@venusprotocol/protocol-reserve/deployments/bsctestnet.json";
import PsrEthereum from "@venusprotocol/protocol-reserve/deployments/ethereum.json";
import PsrOpBnbTestnet from "@venusprotocol/protocol-reserve/deployments/opbnbtestnet/ProtocolShareReserve.json";
import PsrSepTestnet from "@venusprotocol/protocol-reserve/deployments/sepolia.json";

import { contracts as ArbSepContracts } from "../../../deployments/arbitrumsepolia.json";
import { contracts as MainnetContracts } from "../../../deployments/bscmainnet.json";
import { contracts as TestnetContracts } from "../../../deployments/bsctestnet.json";
import { contracts as EthereumContracts } from "../../../deployments/ethereum.json";
import { contracts as OpBnbMainnetContracts } from "../../../deployments/opbnbmainnet.json";
import { contracts as OpBnbTestnetContracts } from "../../../deployments/opbnbtestnet.json";
import { contracts as SepoliaContracts } from "../../../deployments/sepolia.json";

export const contractAddresses = {
  sepolia: {
    ADMIN: "0x94fa6078b6b8a26F0B6EDFFBE6501B22A10470fB",
    ACM: GovernanceSepTestnet.contracts.AccessControlManager.address,
    TOKEN1: SepoliaContracts.MockcrvUSD.address, // crvUSD
    TOKEN2: SepoliaContracts.MockCRV.address, // CRV
    VTOKEN1: SepoliaContracts.VToken_vcrvUSD_Core.address,
    VTOKEN2: SepoliaContracts.VToken_vCRV_Core.address,
    COMPTROLLER: SepoliaContracts.Comptroller_Core.address,
    PSR: PsrSepTestnet.contracts.ProtocolShareReserve.address,
    REWARD_DISTRIBUTOR1: SepoliaContracts.RewardsDistributor_Core_1.address,
    POOL_REGISTRY: SepoliaContracts.PoolRegistry.address,
    CHAINLINK_ORACLE: OracleSepTestnet.contracts.ChainlinkOracle.address,
    RESILIENT_ORACLE: OracleSepTestnet.contracts.ResilientOracle.address,
    TOKEN1_HOLDER: "0x02EB950C215D12d723b44a18CfF098C6E166C531",
    TOKEN2_HOLDER: "0x02EB950C215D12d723b44a18CfF098C6E166C531",
    ACC1: "0x3Ac99C7853b58f4AA38b309D372562a5A88bB9C1",
    ACC2: "0xA4a04C2D661bB514bB8B478CaCB61145894563ef",
    ACC3: "0x394d1d517e8269596a7E4Cd1DdaC1C928B3bD8b3",
    BLOCK_NUMBER: 5820200,
  },
  ethereum: {
    ADMIN: "0x285960C5B22fD66A736C7136967A3eB15e93CC67",
    ACM: GovernanceEthMainnet.contracts.AccessControlManager.address,
    TOKEN1: "0xf939E0A03FB07F59A73314E73794Be0E57ac1b4E", // crvUSD
    TOKEN2: "0xD533a949740bb3306d119CC777fa900bA034cd52", // CRV
    VTOKEN1: EthereumContracts.VToken_vcrvUSD_Curve.address,
    VTOKEN2: EthereumContracts.VToken_vCRV_Curve.address,
    COMPTROLLER: EthereumContracts.Comptroller_Curve.address,
    PSR: PsrEthereum.contracts.ProtocolShareReserve.address,
    REWARD_DISTRIBUTOR1: EthereumContracts.RewardsDistributor_Core_1.address,
    POOL_REGISTRY: EthereumContracts.PoolRegistry.address,
    CHAINLINK_ORACLE: OracleEthMainnet.contracts.ChainlinkOracle.address,
    RESILIENT_ORACLE: OracleEthMainnet.contracts.ResilientOracle.address,
    TOKEN1_HOLDER: "0xa920de414ea4ab66b97da1bfe9e6eca7d4219635",
    TOKEN2_HOLDER: "0x5f3b5dfeb7b28cdbd7faba78963ee202a494e2a2",
    ACC1: "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
    ACC2: "0x29182006a4967e9a50C0A66076dA514993D3B4D4",
    ACC3: "0xa27CEF8aF2B6575903b676e5644657FAe96F491F",
    BLOCK_NUMBER: 19781700,
  },
  bsctestnet: {
    ADMIN: GovernanceBscTestnet.contracts.NormalTimelock.address,
    ACM: GovernanceBscTestnet.contracts.AccessControlManager.address,
    TOKEN1: TestnetContracts.MockUSDD.address,
    TOKEN2: TestnetContracts.MockHAY.address,
    VTOKEN1: TestnetContracts.VToken_vUSDD_StableCoins.address,
    VTOKEN2: TestnetContracts.VToken_vHAY_StableCoins.address,
    COMPTROLLER: TestnetContracts.Comptroller_StableCoins.address,
    PSR: PsrBscTestnet.contracts.ProtocolShareReserve.address,
    SHORTFALL: TestnetContracts.Shortfall.address,
    RISKFUND: TestnetContracts.RiskFund.address,
    REWARD_DISTRIBUTOR1: TestnetContracts.RewardsDistributor_StableCoins_0.address,
    POOL_REGISTRY: TestnetContracts.PoolRegistry.address,
    RESILIENT_ORACLE: OracleBscTestnet.contracts.ResilientOracle.address,
    CHAINLINK_ORACLE: OracleBscTestnet.contracts.ChainlinkOracle.address,
    BINANCE_ORACLE: OracleBscTestnet.contracts.BinanceOracle.address,
    TOKEN1_HOLDER: "0x02EB950C215D12d723b44a18CfF098C6E166C531",
    TOKEN2_HOLDER: "0x02EB950C215D12d723b44a18CfF098C6E166C531",
    ACC1: "0xe70898180a366F204AA529708fB8f5052ea5723c",
    ACC2: "0xA4a04C2D661bB514bB8B478CaCB61145894563ef",
    ACC3: "0x394d1d517e8269596a7E4Cd1DdaC1C928B3bD8b3",
    BLOCK_NUMBER: 39974300,
  },
  bscmainnet: {
    ADMIN: GovernanceBscMainnet.contracts.NormalTimelock.address,
    ACM: GovernanceBscMainnet.contracts.AccessControlManager.address,
    VTOKEN1: MainnetContracts.VToken_vUSDD_Stablecoins.address,
    VTOKEN2: MainnetContracts.VToken_vHAY_Stablecoins.address,
    COMPTROLLER: MainnetContracts.Comptroller_Stablecoins.address,
    PSR: PsrBscMainnet.contracts.ProtocolShareReserve.address,
    SHORTFALL: MainnetContracts.Shortfall.address,
    RISKFUND: MainnetContracts.RiskFund.address,
    REWARD_DISTRIBUTOR1: MainnetContracts.RewardsDistributor_Stablecoins_0.address,
    POOL_REGISTRY: MainnetContracts.PoolRegistry.address,
    RESILIENT_ORACLE: OracleBscMainnet.contracts.ResilientOracle.address,
    CHAINLINK_ORACLE: OracleBscMainnet.contracts.ChainlinkOracle.address,
    BINANCE_ORACLE: OracleBscMainnet.contracts.BinanceOracle.address,
    TOKEN1: "0xd17479997F34dd9156Deef8F95A52D81D265be9c", // USDD
    TOKEN2: "0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5", // HAY
    TOKEN1_HOLDER: "0x53f78A071d04224B8e254E243fFfc6D9f2f3Fa23",
    TOKEN2_HOLDER: "0x09702Ea135d9D707DD51f530864f2B9220aAD87B",
    ACC1: "0x3Ac99C7853b58f4AA38b309D372562a5A88bB9C1",
    ACC2: "0xA4a04C2D661bB514bB8B478CaCB61145894563ef",
    ACC3: "0x394d1d517e8269596a7E4Cd1DdaC1C928B3bD8b3",
    BLOCK_NUMBER: 38364500,
  },
  opbnbtestnet: {
    ADMIN: "0xb15f6EfEbC276A3b9805df81b5FB3D50C2A62BDf",
    ACM: GovernanceOpBnbTestnet.contracts.AccessControlManager.address,
    VTOKEN1: OpBnbTestnetContracts.VToken_vBTCB_Core.address,
    VTOKEN2: OpBnbTestnetContracts.VToken_vETH_Core.address,
    COMPTROLLER: OpBnbTestnetContracts.Comptroller_Core.address,
    PSR: PsrOpBnbTestnet.address,
    REWARD_DISTRIBUTOR1: "",
    POOL_REGISTRY: OpBnbTestnetContracts.PoolRegistry.address,
    RESILIENT_ORACLE: OracleOpBnbTestnet.contracts.ResilientOracle.address,
    CHAINLINK_ORACLE: "",
    BINANCE_ORACLE: OracleOpBnbTestnet.contracts.BinanceOracle.address,
    TOKEN1: "0x7Af23F9eA698E9b953D2BD70671173AaD0347f19", // BTCB
    TOKEN2: "0x94680e003861D43C6c0cf18333972312B6956FF1", // ETH
    TOKEN1_HOLDER: "0x2ce1d0ffd7e869d9df33e28552b12ddded326706",
    TOKEN2_HOLDER: "0x638eb8dfff094fd1d52c5a198b44984806c521e5",
    USDT_HOLDER: "0x8894E0a0c962CB723c1976a4421c95949bE2D4E3",
    ACC1: "0x3Ac99C7853b58f4AA38b309D372562a5A88bB9C1",
    ACC2: "0xA4a04C2D661bB514bB8B478CaCB61145894563ef",
    ACC3: "0x394d1d517e8269596a7E4Cd1DdaC1C928B3bD8b3",
    BLOCK_NUMBER: 22749193,
  },
  opbnbmainnet: {
    ADMIN: "0xC46796a21a3A9FAB6546aF3434F2eBfFd0604207",
    ACM: GovernanceOpBnbMainnet.contracts.AccessControlManager.address,
    VTOKEN1: OpBnbMainnetContracts.VToken_vUSDT_Core.address,
    VTOKEN2: OpBnbMainnetContracts.VToken_vFDUSD_Core.address,
    COMPTROLLER: OpBnbMainnetContracts.Comptroller_Core.address,
    PSR: "0xDDc9017F3073aa53a4A8535163b0bf7311F72C52",
    REWARD_DISTRIBUTOR1: "",
    POOL_REGISTRY: OpBnbMainnetContracts.PoolRegistry.address,
    RESILIENT_ORACLE: OracleOpBnbMainnet.contracts.ResilientOracle.address,
    CHAINLINK_ORACLE: "",
    BINANCE_ORACLE: OracleOpBnbMainnet.contracts.BinanceOracle.address,
    TOKEN1: "0x9e5AAC1Ba1a2e6aEd6b32689DFcF62A509Ca96f3", // USDT
    TOKEN2: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb", // FDUSD
    TOKEN1_HOLDER: "0x001ceb373c83ae75b9f5cf78fc2aba3e185d09e2",
    TOKEN2_HOLDER: "0x001ceb373c83ae75b9f5cf78fc2aba3e185d09e2",
    ACC1: "0x3Ac99C7853b58f4AA38b309D372562a5A88bB9C1",
    ACC2: "0xA4a04C2D661bB514bB8B478CaCB61145894563ef",
    ACC3: "0x394d1d517e8269596a7E4Cd1DdaC1C928B3bD8b3",
    BLOCK_NUMBER: 17881611,
  },
  arbitrumsepolia: {
    ADMIN: "0x1426A5Ae009c4443188DA8793751024E358A61C2",
    ACM: GovernanceArbSep.contracts.AccessControlManager.address,
    VTOKEN1: ArbSepContracts.VToken_vARB_Core.address,
    VTOKEN2: ArbSepContracts.VToken_vWETH_Core.address,
    COMPTROLLER: ArbSepContracts.Comptroller_Core.address,
    PSR: PsrArbSep.contracts.ProtocolShareReserve.address,
    REWARD_DISTRIBUTOR1: "0x8E73FE3F7E29100Ad9d1C7F35fba2D2c823c8579",
    POOL_REGISTRY: ArbSepContracts.PoolRegistry.address,
    RESILIENT_ORACLE: OracleArbSep.contracts.ResilientOracle.address,
    CHAINLINK_ORACLE: OracleArbSep.contracts.ChainlinkOracle.address,
    TOKEN1: ArbSepContracts.MockARB, // ARB
    TOKEN2: "0x980B62Da83eFf3D4576C647993b0c1D7faf17c73", // WETH
    TOKEN1_HOLDER: "0x02EB950C215D12d723b44a18CfF098C6E166C531",
    TOKEN2_HOLDER: "0x980B62Da83eFf3D4576C647993b0c1D7faf17c73",
    ACC1: "0x3Ac99C7853b58f4AA38b309D372562a5A88bB9C1",
    ACC2: "0xA4a04C2D661bB514bB8B478CaCB61145894563ef",
    ACC3: "0x394d1d517e8269596a7E4Cd1DdaC1C928B3bD8b3",
    BLOCK_NUMBER: 38794894,
  },
};
