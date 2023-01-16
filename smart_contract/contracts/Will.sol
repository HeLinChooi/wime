// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Will {
    struct Client {
        address payable pubKey;
        address privKey;
    }

    struct Beneficiary {
        address payable pubKey;
        uint256 distribution;
    }

    Beneficiary public beneficiary;
    Client public client;
    mapping(address => bool) public isDistributed;

    constructor(
        address payable _clientPubKey,
        address payable _beneficiaryPubKey,
        uint256 _beneficiaryDistribution
    ) {
        client.pubKey = _clientPubKey;
        beneficiary.pubKey = _beneficiaryPubKey;
        beneficiary.distribution = _beneficiaryDistribution;
    }

    function getBeneficiary() public view returns (address) {
        return beneficiary.pubKey;
    }

    function distributeAssets() public payable returns (bool) {
        uint256 totalAssets = msg.sender.balance;
        uint256 amount = (beneficiary.distribution * totalAssets) / 100;
        beneficiary.pubKey.transfer(amount);
        isDistributed[client.pubKey] = true;
        return isDistributed[client.pubKey];
    }
}
