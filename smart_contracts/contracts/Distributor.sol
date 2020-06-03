pragma solidity ^0.5.0;

import "./Entities.sol";

contract Distributor {
    using Entities for Entities.Entity;
    
    event DistributorAdded(address indexed account);
    event DistributorRemoved(address indexed account);
    
    Entities.Entity private distr; 
    
    constructor() public {
        _addDistr(msg.sender);
    }
    
    modifier onlyDistr() {
        require(isDistr(msg.sender));
        _;
    }
    
    function isDistr(address acc) public view returns (bool) {
        return distr.own(acc);
    }
    
    function addDistr (address acc) public onlyDistr {
        _addDistr(acc);
    }
    
    function remDistr() public {
        _remDistr(msg.sender);
    }
    
    function _addDistr (address acc) internal {
        distr.add(acc);
        emit DistributorAdded(acc);
    }
    
    function _remDistr (address acc) internal {
        distr.rem(acc);
        emit DistributorRemoved(acc);
    }
}



