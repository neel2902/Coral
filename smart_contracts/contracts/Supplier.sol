// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;
import "./Entities.sol";
contract Supplier {
    using Entities for Entities.Entity;
    event SupplierAdded(address indexed account);
    event SupplierRemoved(address indexed account);
    Entities.Entity private supp; // Define a struct 'supp'
    constructor() public {
        _addSupp(msg.sender);
    }
    modifier onlySupp() {
        require(isSupp(msg.sender), "Sender not authorized.");
        _;
    }
    function isSupp(address acc) public view returns  (bool) {
        return supp.own(acc);
    }
    function addSupp (address acc) public onlySupp {
        _addSupp(acc);
    }
    function remSupp() public {
        _remSupp(msg.sender);
    }
    function _addSupp (address acc) internal {
        supp.add(acc);
        emit SupplierAdded(acc);
    }
    function _remSupp (address acc) internal {
        supp.rem(acc);
        emit SupplierRemoved(acc);
    }
}
