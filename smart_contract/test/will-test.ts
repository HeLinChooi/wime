import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

// Command to test: npx hardhat test --typecheck test/will-test.ts
describe("Will", async function () {
  const _ownerPubKey = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const _beneficiaryPubKey = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const _beneficiaryDistribution = "100";

  const oneETH = 1;
  async function deployContractFixture() {

    // Get Ethereum external account
    const [owner, beneficiary] = await ethers.getSigners();

    // Get the contract factory
    const Will = await ethers.getContractFactory("Will");

    // Deploy the contract
    const will = await Will.deploy(
      _ownerPubKey,
      _beneficiaryPubKey,
      _beneficiaryDistribution,
      ethers.utils.parseEther(oneETH.toString()),
      { value: ethers.utils.parseEther(oneETH.toString()) }
    );

    const scBalance = await will.getBalance();
    console.log("scBalance", ethers.utils.formatEther(scBalance));

    return { will, owner, beneficiary };
  }

  it("Should return beneficiary pubKey", async () => {
    const { will } = await loadFixture(deployContractFixture);

    const beneficiary = await will.getBeneficiary();
    expect(beneficiary).to.equal(_beneficiaryPubKey);
  });

  it("Should transfer assets to beneficiary", async () => {
    const { will, owner, beneficiary } = await loadFixture(deployContractFixture);
    const ownerBalance = await ethers.provider.getBalance(owner.address);

    // console.log('ownerBalance', ownerBalance);
    // Get the initial balance of the recipient
    const initialBalance = await ethers.provider.getBalance(beneficiary.address);

    // const amount = ownerBalance.sub(ethers.utils.parseEther(oneETH.toString()));
    const amount = ethers.utils.parseEther(oneETH.toString());
    await will.distributeAssets(amount, {
      value: amount,
    });

    const scBalance2 = await will.getBalance();
    console.log("scBalance2", ethers.utils.formatEther(scBalance2));
    // Get the final balance of the recipient
    const finalBalance = await ethers.provider.getBalance(beneficiary.address);

    // Calculate the difference between the initial and final balances
    const difference = finalBalance.sub(initialBalance);
    console.log('initialBalance', ethers.utils.formatEther(initialBalance));
    console.log('finalBalance', ethers.utils.formatEther(finalBalance));
    expect(difference).to.equal(amount);
  });
});
