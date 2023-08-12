import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();


const config: HardhatUserConfig = {
  defaultNetwork:"base-goerli",
  solidity: "0.8.18",
  networks:{
    "base-goerli": {
      url: "https://goerli.base.org",
      accounts: [process.env.PRIVATE_KEY as string],
      gasPrice: 1000000000 as number,
    },
  },
};

export default config;
