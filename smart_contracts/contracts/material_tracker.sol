pragma solidity ^0.5.0;

contract MaterialTracker {
    enum DevStat {YETTOBEPICKED,ENROUTE,DELIVERED}
    
    string id;
    
    function setMaterialId(string memory serial) public {
          id = serial;
    }
 
    function getMaterialId() public view returns (string memory) {
          return id;
    }
    
    struct Material{
        string name;
        string matrID;
        string descp;
        string supplier_name;
        uint quant;
        bool initz;
    }
    
    address Supp;
    address Manuf;
    DevStat stat;
    
    string[] matrIDlist;
    
    mapping(string => Material) storeMatr;
    
    mapping(address => mapping(string => bool)) storeWallet;
    
    event MatrCreate(address account, string matrID, string supplier_name, uint quant);
    event RejectCreate(address account, string matrID, string message);

    function createMaterial(string memory name, string memory matrID, string memory descp, string memory supplier_name, uint quant) public {
        if (storeMatr[matrID].initz) {
            emit RejectCreate(msg.sender, matrID, "A material with this ID already exists");
            return;
        }
        storeMatr[matrID] = Material(name, matrID, descp, supplier_name, quant, true);
        storeWallet[msg.sender][matrID] = true;
        emit MatrCreate(msg.sender, matrID, supplier_name, quant);
        matrIDlist.push(matrID);
    }
    
    event MatrTransf(address Prod, address Manuf, string matrID);
    event RejectTransf(address Prod, address Manuf, string matrID, string message);
    
    function transfMatr(string memory matrID) public {
        if (!storeMatr[matrID].initz) {
            emit RejectTransf(msg.sender, Manuf, matrID, "No material with this ID exists");
            return;
        }
        
        if (!storeWallet[msg.sender][matrID]) {
            emit RejectTransf(msg.sender, Manuf, matrID, "The sender does not own a material with this ID.");
            return;
        }
        
        storeWallet[msg.sender][matrID] = false;
        storeWallet[Manuf][matrID] = true;
        emit MatrTransf(msg.sender, Manuf, matrID);
    }
    
    function getMatrByUUID(string memory matrID) public view returns (string memory, string memory, string memory, uint) {
        return (storeMatr[matrID].name, storeMatr[matrID].descp, storeMatr[matrID].supplier_name, storeMatr[matrID].quant);
    }
    
    function isOwnerOf(address owner, string memory matrID) public view returns (bool) {
        if(storeWallet[owner][matrID]) {
            return true;
        }
        return false;
    }
}
