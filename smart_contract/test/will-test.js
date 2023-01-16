const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Will", async function () {
  const _beneficiaryPubKey = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const _beneficiaryDistribution = "100";

  it("Should return vault password", async () => {
    const Will = await ethers.getContractFactory("Will");
    const will = await Will.deploy(
      _beneficiaryPubKey,
      _beneficiaryDistribution
    );
    const beneficiaries = await will.getBeneficiaries();
    expect(beneficiaries).to.equal(_beneficiaryPubKey);
  });
});
