// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Will {
    struct Beneficiary {
        address payable pubKey;
        uint256 distribution;
    }
    Beneficiary public beneficiary;
    mapping(address => bool) public isDistributed;

    constructor(
        address payable _beneficiaryPubKey,
        uint256 _beneficiaryDistribution
    ) {
        beneficiary.pubKey = _beneficiaryPubKey;
        beneficiary.distribution = _beneficiaryDistribution;
    }

    function getBeneficiaries() public view returns (address) {
        return beneficiary.pubKey;
    }
}
