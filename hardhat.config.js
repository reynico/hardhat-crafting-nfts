require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");

require('dotenv').config()
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const MNEMONIC = process.env.MNEMONIC
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  solidity: "0.8.20",
  namedAccounts: {
    deployer: {
      default: 0
    }
  },
  sourcify: {
    enabled: false
  }
};
