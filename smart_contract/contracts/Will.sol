// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Will {
    struct Owner {
        address payable pubKey;
    }

    struct Beneficiary {
        address payable pubKey;
        uint256 distribution;
    }

    Beneficiary public beneficiary;
    Owner public owner;
    mapping(address => bool) public isDistributed;

    constructor(
        address payable _ownerPubKey,
        address payable _beneficiaryPubKey,
        uint256 _beneficiaryDistribution,
        uint256 _endowment
    ) payable {
        require(
            msg.value == _endowment,
            "The ether sent should be the same as parameter sent!"
        );
        owner.pubKey = _ownerPubKey;
        beneficiary.pubKey = _beneficiaryPubKey;
        beneficiary.distribution = _beneficiaryDistribution;
    }

    function getBeneficiary() public view returns (address) {
        return beneficiary.pubKey;
    }

    function distributeAssets(uint256 ownerBalance)
        public
        payable
    {
        require(
            msg.sender == owner.pubKey,
            "You aren't the owner"
        );
        require(
            msg.value == ownerBalance,
            "The ether sent should be the same as parameter sent!"
        );

        // uint256 totalAssets = msg.sender.balance;
        uint256 amount = (beneficiary.distribution * msg.value) / 100;
        isDistributed[beneficiary.pubKey] = true;
        require(
            beneficiary.pubKey != address(0),
            "Beneficiary address must be a valid address"
        );
        console.log(
            "Transferring from %s to %s %s wei",
            msg.sender,
            beneficiary.pubKey,
            amount
        );
        beneficiary.pubKey.transfer(amount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
