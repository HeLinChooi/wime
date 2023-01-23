// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract SendWei {
    uint256 unlessNumber;
    address payable public owner;

    constructor(uint256 _unlessNumber) payable {
        unlessNumber = _unlessNumber;
        owner = payable(msg.sender);
    }

    function sendWei(address payable recipient, uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        console.log("address(this).balance", address(this).balance);
        owner.transfer(amount);
        // recipient.transfer(amount);
    }
}
