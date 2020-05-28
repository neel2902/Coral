pragma solidity ^0.5.0;
 
contract Logistics {
    
    address public Owner;
    
    address[] entities;
    
    enum Role {
        NOROLE, SUPPLIER, TRANSPORTER, MANUFACTURER, WHOLESALER, DISTRIBUTOR, RETAILER 
    }
    
    struct EntInfo {
        string name;
        string loc;
        address ETHaddr;
        Role role;
    }
    
    constructor() public {
        Owner = msg.sender;
    }
    
    mapping(address => EntInfo) EntDetails;
    
    event EntReg(address indexed ETHaddr, string name);
    
    function regEnt (address ETHaddr, string memory name, string memory loc, Role role) public {
        EntDetails[ETHaddr] = EntInfo(name, loc, ETHaddr, role);
        entities.push(ETHaddr);
        emit EntReg(ETHaddr, name);
    }
    
    function getEntInfo (address Ent) public view returns (string memory name, string memory loc, address ETHaddr, Role role) {
        return(EntDetails[Ent].name, EntDetails[Ent].loc, EntDetails[Ent].ETHaddr, EntDetails[Ent].role);
    }
    
    function TotalEnt() public view returns(uint count) {
        return entities.length;
    }
    function getEntbyIndex(uint i) public view returns(string memory name, string memory loc, address ETHaddr, Role role) {
        return getEntInfo(entities[i]);
    }
}
