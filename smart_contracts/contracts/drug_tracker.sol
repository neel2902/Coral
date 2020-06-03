pragma solidity ^0.5.0;
 
contract DrugTracker {
    
    struct Drug {
        string name;
        bytes32 drugID;
        string descp;
        string manuf;
        string manuf_date;
        bool initz;
    }
    
    bytes32[] drugIDlist;
    
    mapping(bytes32 => Drug) storeDrug;
    
    mapping(address => mapping(bytes32 => bool)) storeWallet;
    
    event DrugCreate(address account, bytes32 drugID, string manuf, string manuf_date);
    event RejectCreate(address account, bytes32 drugID, string message);

    function createDrug(string memory name, string memory descp, bytes32 drugID, string memory manuf, string memory manuf_date) public {
        if (storeDrug[drugID].initz) {
            emit RejectCreate(msg.sender, drugID, "A product with this uuid already exists");
            return;
        }
        storeDrug[drugID] = Drug(name, drugID, descp, manuf, manuf_date, true);
        storeWallet[msg.sender][drugID] = true;
        emit DrugCreate(msg.sender, drugID, manuf, manuf_date);
        drugIDlist.push(drugID);
    }
    
    event DrugTransf(address From, address Distr, bytes32 drugID);
    event RejectTransf(address From, address Distr, bytes32 drugID, string message);
    
    function transfDrug(address Distr,  bytes32 drugID) public {
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
    
    function getDrugByID(bytes32 drugID) public view returns (string memory, string memory, string memory, string memory) {
        return (storeDrug[drugID].name, storeDrug[drugID].descp, storeDrug[drugID].manuf, storeDrug[drugID].manuf_date);
    }
    
    function isOwnerOf(address owner, bytes32 drugID) public view returns (bool) {
        if(storeWallet[owner][drugID]) {
            return true;
        }
        return false;
    }
}   
