import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, providers } from "ethers";
import { ethers } from "hardhat";

describe("ReceiveEther", function () {
  let myContract: Contract;
  let address1: SignerWithAddress;
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
    expect(await provider.getBalance(myContract.address)).to.equal(0);
    await address1.sendTransaction({
      to: myContract.address,
      value: 100,
    });
    expect(await provider.getBalance(myContract.address)).to.equal(100);
  });
});
