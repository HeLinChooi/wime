// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "https://github.com/smartcontractkit/chainlink/evm-contracts/src/v0.8/ChainlinkClient.sol";

contract SecureFundTransfer {
    // variable to store the vault password
    bytes32 private vaultPassword;

    // array to store the authorized addresses for multi-sig
    mapping(string => bool) private authorizedAddressesForMultiSig;

    // variable to store the WIME-ACCESS API endpoint
    string private WIME_ACCESS_API_Endpoint;

    // variable to store the owner address
    address private owner;

    ChainlinkClient oracle;
    bytes32 private jobId;

    constructor(bytes32 _vaultPassword, string memory _WIME_ACCESS_API_Endpoint, address _oracle)
        public
    {
        vaultPassword = _vaultPassword;
        WIME_ACCESS_API_Endpoint = _WIME_ACCESS_API_Endpoint;
        oracle = ChainlinkClient(_oracle);
        owner = msg.sender;
    }

    // function to request proof
    function requestProof(address _validator) public {
        require(msg.sender == owner, "Unauthorized account");

        // call the WIME-ACCESS API to request proof
        bytes memory proof = callAPI(
            bytes4(keccak256("proof(address)")),
            _validator
        );

        // verify the proof
        require(verifyMultiSigSucceeded(proof), "Invalid proof");
    }

    // function to check if all validator called the smart contract
    function verifyMultiSigSucceeded() private {
        for (uint256 i = 0; i < authorizedAddressesForMultiSig.length; i++) {
            if (!authorizedAddressesForMultiSig[i]) {
                return false;
            }
        }
        return true;
    }

    function callAPI(string memory _endpoint) public {
        // create the request
        jobId = oracle.makeChainlinkRequest(
            _endpoint,
            address(this),
            this.fulfill.selector
        );
    }

    // function to add validator
    function addValidator(address _validator) public {
        require(msg.sender == owner, "Unauthorized account");

        // add the validator to the authorized addresses for multi-sig
        authorizedAddressesForMultiSig.push(_validator);
    }

    // function to verify signature
    function verifySignature(address _validator, bytes32 _signature) public {
        require(
            msg.sender == authorizedAddressesForMultiSig,
            "Unauthorized account"
        );

        // check if the validator is in the authorized addresses for multi-sig
        require(validatorExists(_validator), "Unauthorized validator");

        // verify the signature
        require(
            address(
                uint160(keccak256(abi.encodePacked(_validator, vaultPassword)))
            ).recover(_signature) == _validator,
            "Invalid signature"
        );
    }

    // function to trigger the transfer fund smart contract
    function triggerTransferFundSmartContract(
        address payable _recipient,
        uint256 _value
    ) public {
        require(msg.sender == owner, "Unauthorized account");

        // check that the smart contract is valid
        require(
            address(transferFundSmartContractAddress).isContract(),
            "Invalid transfer fund smart contract address"
        );

        // return vault password
    }
}
