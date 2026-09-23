import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/types";
import { expect } from "chai";
import type { ReceiveEther } from "../types/ethers-contracts/index.js";
import { network } from "hardhat";

const { ethers } = await network.getOrCreate();

describe("ReceiveEther", function () {
  let myContract: ReceiveEther;
  let address1: HardhatEthersSigner;
  beforeEach(async () => {
    // Get the contract factory
    const ReceiveEther = await ethers.getContractFactory("ReceiveEther");
    [address1] = await ethers.getSigners();

    // Deploy the contract
    myContract = await ReceiveEther.deploy();
  });

  it("Should send ether to the contract and update the account balance mapping", async () => {
    // const provider = providers.getDefaultProvider();
    const provider = ethers.provider;
    const latestBlock = await ethers.provider.getBlock("latest");
    console.log('latestBlock', latestBlock);
    expect(await provider.getBalance(myContract.target)).to.equal(0);

    console.log('address1', address1);
    await address1.sendTransaction({
      to: myContract.target,
      value: 100,
    });
    expect(await provider.getBalance(myContract.target)).to.equal(100);
    expect(await myContract.getAccountBalances(address1.address)).to.equal(100);
  });
});
