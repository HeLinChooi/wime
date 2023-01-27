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

    mapping(address => bool) public authorizedAddressesForMultiSig;
    address[] validatorAddresses;

    Beneficiary public beneficiary;
    Owner public owner;
    mapping(address => bool) public isDistributed;

    constructor(
        address payable _ownerPubKey,
        address payable _beneficiaryPubKey,
        uint256 _beneficiaryDistribution,
        uint256 _endowment,
        address[] memory _validatorAddresses
    ) payable {
        require(
            msg.value == _endowment,
            "The ether sent should be the same as parameter sent!"
        );
        owner.pubKey = _ownerPubKey;
        beneficiary.pubKey = _beneficiaryPubKey;
        beneficiary.distribution = _beneficiaryDistribution;
        for (uint256 i = 0; i < _validatorAddresses.length; i++) {
            authorizedAddressesForMultiSig[_validatorAddresses[i]] = false;
        }
        validatorAddresses = _validatorAddresses;
    }

    function validate() public payable {
        require(
            validatorAddresses.length > 0,
            "Validator addresses have not been set"
        );
        // QUES: really becuz of revert at the end?
        // revert("testing revert if there will be a message");
        console.log("msg.sender is", msg.sender);
        for (uint256 i = 0; i < validatorAddresses.length; i++) {
            console.log("validatorAddresses[i]", validatorAddresses[i]);
            if (msg.sender == validatorAddresses[i]) {
                authorizedAddressesForMultiSig[msg.sender] = true;
                console.log(
                    "authorizedAddressesForMultiSig[msg.sender] ",
                    authorizedAddressesForMultiSig[msg.sender]
                );
                return;
            }
        }
        revert("You aren't one of the validators");
    }

    function getBeneficiary() public view returns (address) {
        return beneficiary.pubKey;
    }

    function getValidators() public view returns (address[] memory) {
        return validatorAddresses;
    }

    function distributeAssets(uint256 ownerBalance) public payable {
        require(msg.sender == owner.pubKey, "You aren't the owner");
        require(
            msg.value == ownerBalance,
            "The ether sent should be the same as parameter sent!"
        );
        for (uint256 i = 0; i < validatorAddresses.length; i++) {
            if (
                authorizedAddressesForMultiSig[validatorAddresses[i]] == false
            ) {
                revert("All validators have yet approve the assets transfer");
            }
        }

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
