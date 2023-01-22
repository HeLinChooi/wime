// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract SendWei {
    function sendWei(address payable recipient, uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        recipient.transfer(amount);
    }
}