// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

// TODO: Make sure no private key stored on chain
contract Will {
    struct Client {
        address payable pubKey;
        // address privKey;
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
        // uint256 totalAssets = msg.sender.balance;
        // console.log(msg.sender);
        // console.log(totalAssets);
        // uint256 amount = (beneficiary.distribution * totalAssets) / 100;
        // console.log(
        //     "Transferring from %s to %s %s wei",
        //     msg.sender,
        //     beneficiary.pubKey,
        //     amount
        // );
        // beneficiary.pubKey.transfer(amount);
        // isDistributed[beneficiary.pubKey] = true;
        // return isDistributed[beneficiary.pubKey];
        require(beneficiary.pubKey != address(0), "Beneficiary address must be a valid address");
        console.log(
            "Transferring from %s to %s %s wei",
            msg.sender,
            beneficiary.pubKey,
            10
        );
        beneficiary.pubKey.transfer(10);
        return true;
    }
}
