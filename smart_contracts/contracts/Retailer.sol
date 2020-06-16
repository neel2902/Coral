// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "./Entities.sol";

contract Retailer {
    using Entities for Entities.Entity;
    event RetailerAdded(address indexed account);
    event RetailerRemoved(address indexed account);
    Entities.Entity private retl;
    constructor() public {
        _addRetl(msg.sender);
    }
    modifier onlyRetl() {
        require(isRetl(msg.sender), "Sender unauthorised");
        _;
    }
    function isRetl(address acc) public view returns (bool) {
        return retl.own(acc);
    }
    function addRetl (address acc) public onlyRetl {
        _addRetl(acc);
    }
    function remRetl() public {
        _remRetl(msg.sender);
    }
    function _addRetl (address acc) internal {
        retl.add(acc);
        emit RetailerAdded(acc);
    }
    function _remRetl (address acc) internal {
        retl.rem(acc);
        emit RetailerRemoved(acc);
    }
}


