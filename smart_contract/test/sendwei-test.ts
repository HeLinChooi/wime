import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";

describe("SendWei", () => {
  
  // beforeEach(async () => {
  //     // Get the contract factory
  //     const SendWei = await ethers.getContractFactory("SendWei");

  //     // Deploy the contract
  //     myContract = await SendWei.deploy();
  // });

  it("should send 10 wei to an address", async () => {
      let myContract: Contract;
      const SendWei = await ethers.getContractFactory("SendWei");

      // Deploy the contract
      myContract = await SendWei.deploy();
        // Define the recipient address
        const recipient = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
        const amount = 10;

        // Get the initial balance of the recipient
        const signer = await ethers.getSigner(recipient);
        const initialBalance = await (await signer.getBalance(recipient)).toNumber();

        // Send 10 wei to the recipient
        await myContract.sendWei(recipient, amount);

        // Get the final balance of the recipient
        const finalBalance = await (await signer.getBalance(recipient)).toNumber();

        // Calculate the difference between the initial and final balances
        const difference = finalBalance - initialBalance;

        // Expect the difference to be equal to the amount sent
        expect(difference).to.equal(amount);
    });
});