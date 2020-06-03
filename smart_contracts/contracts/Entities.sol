pragma solidity ^0.5.0;

//Library for managing addresses assigned to an entity.

library Entities {
    
    struct Entity {
        mapping (address => bool) entMap;
    }
    
    function own (Entity storage ent, address acc) public view returns (bool) {
        require(acc != address(0));
        return ent.entMap[acc];
    }
    
    function add (Entity storage ent, address acc) public {
        require(acc != address(0));
        require(!own(ent,acc));
        ent.entMap[acc] = true;
    }
    
    function rem (Entity storage ent, address acc) public {
        require(acc != address(0));
        require(own(ent,acc));
        ent.entMap[acc] = false;
    }
}
