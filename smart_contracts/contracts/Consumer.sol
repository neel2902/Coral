pragma solidity ^0.5.0;

import "./Entities.sol";

contract Consumer {
    using Entities for Entities.Entity;
    
    event ConsumerAdded(address indexed account);
    event ConsumerRemoved(address indexed account);
    
    Entities.Entity private cons;
    
    constructor() public {
        _addCons(msg.sender);
    }
    
    modifier onlyCons() {
        require(isCons(msg.sender));
        _;
    }
    
    function isCons(address acc) public view returns (bool) {
        return cons.own(acc);
    }
    
    function addCons (address acc) public onlyCons {
        _addCons(acc);
    }
    
    function remCons() public {
        _remCons(msg.sender);
    }
    
    function _addCons (address acc) internal {
        cons.add(acc);
        emit ConsumerAdded(acc);
    }
    
    function _remCons (address acc) internal {
        cons.rem(acc);
        emit ConsumerRemoved(acc);
    }
}


