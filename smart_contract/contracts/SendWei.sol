// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract SendWei {
    uint256 unlessNumber;
    address payable public owner;

    constructor(uint256 _endowment) payable {
        require(msg.value == _endowment, "The ether sent should be the same as parameter sent!");
        unlessNumber = _endowment;
        owner = payable(msg.sender);
    }

    function sendWei(address payable recipient) public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        recipient.transfer(msg.value);
        // recipient.transfer(amount);
    }
    
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
