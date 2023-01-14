// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract SecondSmartContract {
    struct Beneficiary {
        address payable addr;
        uint256 distribution;
    }
    Beneficiary[] public beneficiaries;
    mapping(address => bool) public distributionCompleted;

    function setBeneficiaries(
        address payable[] memory _beneficiaries,
        uint256[] memory _distributions
    ) public {
        require(
            _beneficiaries.length == _distributions.length,
            "Beneficiaries and distributions should have the same length"
        );
        for (uint256 i = 0; i < _beneficiaries.length; i++) {
            beneficiaries.push(
                Beneficiary(_beneficiaries[i], _distributions[i])
            );
        }
    }

    function distributeAssets() public {
        require(
            !distributionCompleted[msg.sender],
            "Assets already distributed"
        );
        uint256 total = msg.sender.balance;
        for (uint256 i = 0; i < beneficiaries.length; i++) {
            uint256 amount = (beneficiaries[i].distribution * total) / 100;
            beneficiaries[i].addr.transfer(amount);
        }
        distributionCompleted[msg.sender] = true;
    }

    function getBeneficiaryAddress(uint256 _index)
        public
        view
        returns (address)
    {
        return beneficiaries[_index].addr;
    }
}
