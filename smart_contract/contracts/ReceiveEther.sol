// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract ReceiveEther {
    mapping(address => uint256) public accountBalances;

    receive() external payable {
        accountBalances[msg.sender] += msg.value;
    }

    function getAccountBalances(address accountAddress)
        external
        view
        returns (uint256)
    {
        return accountBalances[accountAddress];
    }
}
