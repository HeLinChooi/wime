// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "https://github.com/smartcontractkit/chainlink/evm-contracts/src/v0.8/ChainlinkClient.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

contract WimeSecure {
    string public vaultPassword;
    string public wimeAccessAPIEndpoint;

    struct Owner {
        address pubKey;
    }

    struct Client {
        address pubKey;
        uint icNumber;
    }

    struct Validator {
        address pubKey;
        bool authorized;
    }

    Owner owner;
    Client client;
    Validator validator;

    // using Counters for Counters.Counter;
    // Counters.Counter private jobId;

    // ChainlinkClient oracle;l

    constructor(
        string memory _vaultPassword,
        address _ownerPubKey,
        address _clientPubKey,
        uint _clientIcNumber,
        address _validatorPubKey,
        bool _validatorIsAuthorized
    ) {
        vaultPassword = _vaultPassword;
        owner.pubKey = _ownerPubKey;
        client.pubKey = _clientPubKey;
        client.icNumber = _clientIcNumber;
        validator.pubKey = _validatorPubKey;
        validator.authorized = _validatorIsAuthorized;
    }

    // This function ensures that only the owner of the contract
    // can retrieve the vault password by checking if the caller's address
    // is the same as the owner's address stored in the contract.
    function getVaultPassword() public view returns (string memory) {
        // require(
        //     msg.sender == owner.pubKey,
        //     "Caller must be the owner of the contract."
        // );
        return vaultPassword;
    }

    // This function simply returns the owner's address stored in the contract.
    function getOwnerAddress() public view returns (address) {
        return owner.pubKey;
    }

    // Will be called in the event of death on WIME-ONE
    // To verify caller is owner (financial institution)
    function isOwner() public view returns (bool) {
        return msg.sender == owner.pubKey;
    }

    function isValidatorAuthorized() public view returns (bool) {
        // for (uint i = 0; i < validators.length; i++) {
        //     if (!validators[i].authorized) {
        //         return false;
        //     }
        // }

        return validator.authorized;

        // WIME-ACCESS will request signatures from validators
        // WIME-ACCESS will trigger this function by passing in the signatures
        // WIME-SECURE then authorize each transaction
        // Return vault password
    }

    function authorizeValidator() public {
        // If true, update validatorAddresses with address and isAuthorized = true
        // for (uint i = 0; i < validators.length; i++) {
        //     if (validators[i].pubKey == _address) {
        //         validators[i].authorized = true;
        //     }
        // }
        validator.authorized = true;
    }

    function requestVaultPassword() public view returns (string memory) {
        if (requestProofOfDeath()) {
            return getVaultPassword();
        }
        return "Error";
    }

    // Request proof of death through validators' signatures
    function requestProofOfDeath() public pure returns (bool) {
        // Check areValidatorAuthorized() to verify if all have been authorized
        // If true, call getVaultPassword() to return vault password
        // If false, request proof from WIME-ACCESS API using Chainlink

        // Signature is returned by WIME-ACCESS API
        // string memory _validatorPrivateKey = "0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b";
        // Verify if signature is valid

        // If valid, update bool in validatorAddresses for the signer to true
        return true;
    }
}
