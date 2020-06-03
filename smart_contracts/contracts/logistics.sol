pragma solidity ^0.5.0;
 
contract Logistics {
    
    // import './drug_tracker.sol';
    // import './material_tracker.sol';
    
    address[] entities;
    
    enum Role {
        SUPPLIER, TRANSPORTER, MANUFACTURER, DISTRIBUTOR, RETAILER 
    }
    
    struct EntInfo {
        string name;
        string loc;
        address ETHaddr;
        Role role;
    }
    
    mapping(address => EntInfo) EntDetails;
    
    event EntReg(address indexed ETHaddr, string name);
    
    function regEnt (address ETHaddr, string memory name, string memory loc, Role role) public {
        EntDetails[ETHaddr] = EntInfo(name, loc, ETHaddr, role);
        entities.push(ETHaddr);
        emit EntReg(ETHaddr, name);
    }
    
    function getEntInfo (address Ent) public view returns (string memory, string memory, address, Role) {
        return(EntDetails[Ent].name, EntDetails[Ent].loc, EntDetails[Ent].ETHaddr, EntDetails[Ent].role);
    }
    
    function TotalEnt() public view returns(uint) {
        return entities.length;
    }
    function getEntbyIndex(uint i) public view returns(string memory, string memory, address, Role) {
        return getEntInfo(entities[i]);
    }
}
