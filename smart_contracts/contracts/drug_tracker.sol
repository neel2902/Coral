pragma solidity ^0.5.0;
 
contract DrugTracker {
    string id;
    
    function setId(string memory serial) public {
          id = serial;
    }
 
    function getId() public view returns (string memory) {
          return id;
    }
    
    struct Material {
        string name;
        string descp;
        string manuf;
        string creation_date;
    }
    
    struct Drug {
        string name;
        string descp;
        string manuf;
        string creation_date;
        bool initz;
    }
    
    mapping(string => Drug) storeDrug;
    
    mapping(address => mapping(string => bool)) storeWallet;
    
    event DrugCreate(address account, string uuid, string manuf, string creation_date);
    event RejectCreate(address account, string uuid, string message);

    function createDrug(string memory name, string memory descp, string memory uuid, string memory manuf, string memory creation_date) public {
        if (storeDrug[uuid].initz) {
            emit RejectCreate(msg.sender, uuid, "An asset with this uuid already exists");
            return;
        }
        storeDrug[uuid] = Drug(name, descp, manuf, creation_date, true);
        storeWallet[msg.sender][uuid] = true;
        emit DrugCreate(msg.sender, uuid, manuf, creation_date);
    }
    
    event DrugTransf(address From, address To, string uuid);
    event RejectTransf(address From, address To, string uuid, string message);
    
    function transfDrug(address To,  string memory uuid) public {
        if (!storeDrug[uuid].initz) {
            emit RejectTransf(msg.sender, To, uuid, "No asset with this UUID exists");
            return;
        }
        
        if (!storeWallet[msg.sender][uuid]) {
            emit RejectTransf(msg.sender, To, uuid, "Sender does not own an asset with this uuid.");
            return;
        }
        
        storeWallet[msg.sender][uuid] = false;
        storeWallet[To][uuid] = true;
        emit DrugTransf(msg.sender, To, uuid);
    }
    
    function getDrugByUUID(string memory uuid) public view returns (string memory, string memory, string memory) {
        return (storeDrug[uuid].name, storeDrug[uuid].descp, storeDrug[uuid].manuf);
    }
    
    function isOwnerOf(address owner, string memory uuid) public view returns (bool) {
        if(storeWallet[owner][uuid]) {
            return true;
        }
        return false;
    }
}   

