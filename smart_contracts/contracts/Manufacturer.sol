pragma solidity ^0.5.0;

import "./Entities.sol";

contract Manufacturer {
    using Entities for Entities.Entity;
    
    event ManufacturerAdded(address indexed account);
    event ManufacturerRemoved(address indexed account);
    
    Entities.Entity private manuf; 
    
    constructor() public {
        _addManuf(msg.sender);
    }
    
    modifier onlyManuf() {
        require(isManuf(msg.sender));
        _;
    }
    
    function isManuf(address acc) public view returns (bool) {
        return manuf.own(acc);
    }
    
    function addManuf (address acc) public onlyManuf {
        _addManuf(acc);
    }
    
    function remManuf() public {
        _remManuf(msg.sender);
    }
    
    function _addManuf (address acc) internal {
        manuf.add(acc);
        emit ManufacturerAdded(acc);
    }
    
    function _remManuf (address acc) internal {
        manuf.rem(acc);
        emit ManufacturerRemoved(acc);
    }
}


