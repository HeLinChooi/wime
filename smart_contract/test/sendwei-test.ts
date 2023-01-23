import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("SendWei", () => {
  let myContract: Contract;

  async function deploySendWeiFixture() {
    // Get the contract factory
    const SendWei = await ethers.getContractFactory("SendWei");

    const [owner, address1] = await ethers.getSigners();
    console.log("address1", address1);

    // Deploy the contract
    const ONE_GWEI = 10;
    const endowmentValue = ONE_GWEI;
    const sendWei = await SendWei.deploy(1, { value: endowmentValue });
    return { sendWei, owner, address1 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { sendWei, owner, address1 } = await loadFixture(deploySendWeiFixture);

      expect(await sendWei.owner()).to.equal(owner.address);
    });
  });
  it("should send 10 wei to an address", async () => {
    const { sendWei, owner, address1 } = await loadFixture(deploySendWeiFixture);

    // Define the recipient address
    const recipient = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    const amount = 10;

    // Get the initial balance of the recipient
    // const signer = await ethers.getSigner(recipient);
    const initialBalance = await (
      await ethers.provider.getBalance(owner.address)
    ).toNumber();

    // Send 10 wei to the recipient
    await myContract.sendWei(recipient, amount);

    // Get the final balance of the recipient
    const finalBalance = await (
      await ethers.provider.getBalance(owner.address)
    ).toNumber();

    // Calculate the difference between the initial and final balances
    const difference = finalBalance - initialBalance;

    // Expect the difference to be equal to the amount sent
    expect(difference).to.equal(amount);
  });
});
