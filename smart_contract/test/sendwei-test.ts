import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("SendWei", () => {
  let myContract: Contract;
  let address1: SignerWithAddress;

  beforeEach(async () => {
      // Get the contract factory
      const SendWei = await ethers.getContractFactory("SendWei");

      [address1] = await ethers.getSigners();
      console.log("address1", address1);

      // Deploy the contract
      myContract = await SendWei.deploy();
  });

  it("should send 10 wei to an address", async () => {
        // Define the recipient address
        const recipient = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
        const amount = 10;

        // Get the initial balance of the recipient
        // const signer = await ethers.getSigner(recipient);
        const initialBalance = await (await address1.getBalance(recipient)).toNumber();

        // Send 10 wei to the recipient
        await myContract.sendWei(recipient, amount);

        // Get the final balance of the recipient
        const finalBalance = await (await address1.getBalance(recipient)).toNumber();

        // Calculate the difference between the initial and final balances
        const difference = finalBalance - initialBalance;

        // Expect the difference to be equal to the amount sent
        expect(difference).to.equal(amount);
    });
});