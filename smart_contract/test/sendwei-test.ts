import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("SendWei", () => {
  const ONE_GWEI = 1000000000;
  async function deploySendWeiFixture() {
    // Get the contract factory
    const SendWei = await ethers.getContractFactory("SendWei");

    const [owner, address1] = await ethers.getSigners();
    // console.log("address1", address1);

    // Deploy the contract
    const endowmentValue = ONE_GWEI * 0.99;
    const sendWei = await SendWei.deploy(endowmentValue, { value: endowmentValue });
    return { sendWei, owner, address1 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { sendWei, owner, address1 } = await loadFixture(
        deploySendWeiFixture
      );

      expect(await sendWei.owner()).to.equal(owner.address);
    });
  });

  it("should send 10 ETH to an address", async () => {
    const { sendWei, owner, address1 } = await loadFixture(
      deploySendWeiFixture
    );
    const clientAddress = owner.address;
    const receiverAddress = address1.address;

    // Define the recipient address
    const recipient = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    const amountInETH = 10;

    // Get the initial balance of the recipient
    const initialBalance = await ethers.provider.getBalance(receiverAddress);

    const scBalance = await sendWei.getBalance();
    console.log('scBalance', ethers.utils.formatEther(scBalance));
    // Send 10 wei to the recipient
    await sendWei.sendWei(recipient, {value: ethers.utils.parseEther(amountInETH.toString())});
    
    const scBalance2 = await sendWei.getBalance();
    console.log('scBalance2', ethers.utils.formatEther(scBalance2));
    // Get the final balance of the recipient
    const finalBalance = await ethers.provider.getBalance(receiverAddress);

    // Calculate the difference between the initial and final balances
    const difference = finalBalance.sub(initialBalance);
    console.log('initialBalance', ethers.utils.formatEther(initialBalance));
    console.log('finalBalance', ethers.utils.formatEther(finalBalance));
    console.log('difference', ethers.utils.formatEther(difference));

    // Expect the difference to be equal to the amount sent
    expect(difference).to.equal(ethers.utils.parseEther(amountInETH.toString()));
  });
});
