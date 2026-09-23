import hardhatToolboxMochaEthers from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import { defineConfig, task } from "hardhat/config";

// task action function receives the Hardhat Runtime Environment as second argument
const blockNumberTask = task("blockNumber", "Prints the current block number")
  .setInlineAction(async (_, hre) => {
    const { ethers } = await hre.network.getOrCreate();
    await ethers.provider.getBlockNumber().then((blockNumber) => {
      console.log("Current block number: " + blockNumber);
    });
  })
  .build();

export default defineConfig({
  plugins: [hardhatToolboxMochaEthers],
  tasks: [blockNumberTask],
  // defaultNetwork: "goerli",
  solidity: "0.8.9",
  test: {
    mocha: {
      timeout: 40000,
    },
  },
});
