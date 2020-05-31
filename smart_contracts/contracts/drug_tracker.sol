pragma solidity ^0.5.0;
 
contract DrugTracker {
    
    string id;
    
    function setDrugId(string memory serial) public {
          id = serial;
    }
 
    function getDrugId() public view returns (string memory) {
          return id;
    }
    
    struct Drug {
        string name;
        string drugID;
        string descp;
        string manuf;
        string manuf_date;
        bool initz;
    }
    
    string[] drugIDlist;
    
    mapping(string => Drug) storeDrug;
    
    mapping(address => mapping(string => bool)) storeWallet;
    
    event DrugCreate(address account, string drugID, string manuf, string manuf_date);
    event RejectCreate(address account, string uuid, string message);

    function createDrug(string memory name, string memory descp, string memory drugID, string memory manuf, string memory manuf_date) public {
        if (storeDrug[drugID].initz) {
            emit RejectCreate(msg.sender, drugID, "A product with this uuid already exists");
            return;
        }
        storeDrug[drugID] = Drug(name, drugID, descp, manuf, manuf_date, true);
        storeWallet[msg.sender][drugID] = true;
        emit DrugCreate(msg.sender, drugID, manuf, manuf_date);
        drugIDlist.push(drugID);
    }
    
    event DrugTransf(address From, address Distr, string drugID);
    event RejectTransf(address From, address Distr, string drugID, string message);
    
    function transfDrug(address Distr,  string memory drugID) public {
        if (!storeDrug[drugID].initz) {
            emit RejectTransf(msg.sender, Distr, drugID, "No product with this UUID exists");
            return;
        }
        
        if (!storeWallet[msg.sender][drugID]) {
            emit RejectTransf(msg.sender, Distr, drugID, "The sender does not own a drug with this uuid.");
            return;
        }
        
        storeWallet[msg.sender][drugID] = false;
        storeWallet[Distr][drugID] = true;
        emit DrugTransf(msg.sender, Distr, drugID);
    }
    
    function getDrugByUUID(string memory drugID) public view returns (string memory, string memory, string memory, string memory) {
        return (storeDrug[drugID].name, storeDrug[drugID].descp, storeDrug[drugID].manuf, storeDrug[drugID].manuf_date);
    }
    
    function isOwnerOf(address owner, string memory drugID) public view returns (bool) {
        if(storeWallet[owner][drugID]) {
            return true;
        }
        return false;
    }
}   
