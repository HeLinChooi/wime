// pragma solidity ^0.8.0;

// contract MultiSig {
//     address[] public owners;
//     mapping (address => bool) public isOwner;
//     address public owner;

//     constructor(address[] memory _owners) public {
//         owners = _owners;
//         owner = msg.sender;
//         for (uint256 i = 0; i < _owners.length; i++) {
//             isOwner[_owners[i]] = true;
//         }
//     }

//     function isAuthorized(address _addr) public view returns (bool) {
//         return isOwner[_addr];
//     }

//     function execute(address _to, uint256 _value, bytes memory _data) public {
//         require(isAuthorized(msg.sender));
//         require(msg.sender != address(0));
//         require(_to != address(0));
//         require(_value > 0);
//         _to.call.value(_value)(_data);
//     }

//     function addOwner(address _owner) public {
//         require(msg.sender == owner);
//         require(!isAuthorized(_owner));
//         isOwner[_owner] = true;
//         owners.push(_owner);
//     }

//     function removeOwner(address _owner) public {
//         require(msg.sender == owner);
//         require(isAuthorized(_owner));
//         delete isOwner[_owner];
//         for (uint256 i = 0; i < owners.length; i++) {
//             if (owners[i] == _owner) {
//                 delete owners[i];
//                 break;
//             }
//         }
//     }
// }