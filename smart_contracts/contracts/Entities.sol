// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

//Library for managing addresses assigned to an entity.

library Entities {
    struct Entity {
        mapping (address => bool) entMap;
    }
    function own (Entity storage ent, address acc) public view returns (bool) {
        require(acc != address(0), "Sender unauthorised");
        return ent.entMap[acc];
    }
    function add (Entity storage ent, address acc) public {
        require(acc != address(0), "Sender unauthorised");
        require(!own(ent,acc), "Sender unauthorised");
        ent.entMap[acc] = true;
    }
    function rem (Entity storage ent, address acc) public {
        require(acc != address(0), "Sender unauthorised");
        require(own(ent,acc), "Sender unauthorised");
        ent.entMap[acc] = false;
    }
}
