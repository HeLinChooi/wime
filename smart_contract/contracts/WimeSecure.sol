// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "https://github.com/smartcontractkit/chainlink/evm-contracts/src/v0.8/ChainlinkClient.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

contract WimeSecure {
    string private vaultPassword;
    mapping(address => bool) private validatorAddresses;
    string private WimeAccessAPIEndpoint;
    address private ownerAddress;

    // using Counters for Counters.Counter;
    // Counters.Counter private jobId;

    // ChainlinkClient oracle;

    constructor(string memory _vaultPassword) {
        vaultPassword = _vaultPassword;
        // WimeAccessAPIEndpoint = _WimeAccessAPIEndpoint;
        // oracle = ChainlinkClient(_oracle);
        ownerAddress = msg.sender;
    }

    function getVaultPassword() public view returns (string memory) {
        return vaultPassword;
    }

    function getOwnerAddress() public view returns (address) {
        return ownerAddress;
    }

    // Will be called in the event of death on WIME-ONE
    // To verify caller is owner (financial institution)
    function isOwner() public view returns (bool) {
        return msg.sender == ownerAddress;
    }

    // Returns list of unauthorized validator addresses and isAuthorized
    function areValidatorsAuthorized() public view returns (bool) {
        // for (uint i = 0; i < validatorAddresses.length; i++) {
        //     if (validatorAddresses[i][msg.sender] == false) {
        //         return false;
        //     }
        // }
        // return true;

        return validatorAddresses[ownerAddress];

        // WIME-ACCESS will request signatures from validators
        // WIME-ACCESS will trigger this function by passing in the signatures
        // WIME-SECURE then authorize each transaction
        // Return vault password
    }

    function authorizeValidatorAddress(address _address) public {
        // If true, update validatorAddresses with address and isAuthorized = true
        validatorAddresses[_address] = true;
    }

    function requestVaultPassword() public returns (string memory) {
        if (requestProof()) {
            return getVaultPassword();
        }
        return "Error";
    }

    function requestProof() public returns (bool) {
        // Check areValidatorAuthorized() to verify if all have been authorized
        // If true, call getVaultPassword() to return vault password
        // If false, request proof from WIME-ACCESS API using Chainlink

        // Signature is returned by WIME-ACCESS API
        address _validatorAddress = 0xdD2FD4581271e230360230F9337D5c0430Bf44C0;
        // string memory _validatorPrivateKey = "0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b";
        // Verify if signature is valid

        // If valid, update bool in validatorAddresses for the signer to true
        authorizeValidatorAddress(_validatorAddress);
        return true;
    }
}
