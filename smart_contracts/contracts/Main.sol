// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

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

contract Supplier {
    using Entities for Entities.Entity;
    event SupplierAdded(address indexed account);
    event SupplierRemoved(address indexed account);
    Entities.Entity private supp; // Define a struct 'supp'
    constructor() public {
        _addSupp(msg.sender);
    }
    modifier onlySupp() {
        require(isSupp(msg.sender));
        _;
    }
    function isSupp(address acc) public view returns  (bool) {
        return supp.own(acc);
    }
    function addSupp (address acc) public onlySupp {
        _addSupp(acc);
    }
    function remSupp() public {
        _remSupp(msg.sender);
    }
    function _addSupp (address acc) internal {
        supp.add(acc);
        emit SupplierAdded(acc);
    }
    function _remSupp (address acc) internal {
        supp.rem(acc);
        emit SupplierRemoved(acc);
    }
}

contract Manufacturer {
    using Entities for Entities.Entity;
    event ManufacturerAdded(address indexed account);
    event ManufacturerRemoved(address indexed account);
    Entities.Entity private manuf;
    constructor() public {
        _addManuf(msg.sender);
    }
    modifier onlyManuf() {
        require(isManuf(msg.sender));
        _;
    }
    function isManuf(address acc) public view returns (bool) {
        return manuf.own(acc);
    }
    function addManuf (address acc) public onlyManuf {
        _addManuf(acc);
    }
    function remManuf() public {
        _remManuf(msg.sender);
    }
    function _addManuf (address acc) internal {
        manuf.add(acc);
        emit ManufacturerAdded(acc);
    }
    function _remManuf (address acc) internal {
        manuf.rem(acc);
        emit ManufacturerRemoved(acc);
    }
}

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

contract Retailer {
    using Entities for Entities.Entity;
    event RetailerAdded(address indexed account);
    event RetailerRemoved(address indexed account);
    Entities.Entity private retl;
    constructor() public {
        _addRetl(msg.sender);
    }
    modifier onlyRetl() {
        require(isRetl(msg.sender));
        _;
    }
    function isRetl(address acc) public view returns (bool) {
        return retl.own(acc);
    }
    function addRetl (address acc) public onlyRetl {
        _addRetl(acc);
    }
    function remRetl() public {
        _remRetl(msg.sender);
    }
    function _addRetl (address acc) internal {
        retl.add(acc);
        emit RetailerAdded(acc);
    }
    function _remRetl (address acc) internal {
        retl.rem(acc);
        emit RetailerRemoved(acc);
    }
}

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

contract Chain is Manufacturer, Consumer, Retailer, Distributor {
    address public God;
    uint upc; // Universal Product Code
    uint sku; // Stock Keeping Unit
    mapping (uint => Product) prod;
    mapping (uint => string[]) itemsHistory;
    // Define a public mapping 'itemsHistory' that maps the UPC to an array of TxHash, that track its journey through the supply chain -- to be sent from DApp.
    enum State {
        PROCESSED, //0
        PACKED,    //1
        SOLD,      //2
        SHIPPED,   //3
        RECEIVED,  //4
        PURCHASED  //5
    }
    struct Product {
        uint upc;
        uint sku;
        address ownerID; // Metamask-Ethereum address of the current owner as the product moves through 8 stages
        address manufID; // Metamask-Ethereum address of the Manufacturer
        string descp;
        uint productID; // Product ID potentially a combination of upc + sku
        uint price;
        State state;
        address distributorID;
        address retailerID;
        address consumerID;
    }
    event Processed(uint upc);
    event Packed(uint upc);
    event Sold(uint upc);
    event Shipped(uint upc);
    event Received(uint upc);
    event Purchased(uint upc);
    modifier verifyCaller (address _addr) {
        require (msg.sender == _addr);
        _;
    }
    modifier processed (uint _upc) {
        require(prod[_upc].state == State.PROCESSED);
        _;
    }
    modifier packed (uint _upc) {
        require(prod[_upc].state == State.PACKED);
        _;
    }
    modifier sold (uint _upc) {
        require(prod[_upc].state == State.SOLD);
        _;
    }
    modifier shipped (uint _upc) {
        require(prod[_upc].state == State.SHIPPED);
        _;
    }
    modifier received (uint _upc) {
        require(prod[_upc].state == State.RECEIVED);
        _;
    }
    modifier purchased (uint _upc) {
        require(prod[_upc].state == State.PURCHASED);
        _;
    }
    modifier onlyOwner() {
        require(isOwner());
        _;
    }
    function isOwner() public view returns (bool) {
        require(msg.sender == God);
    }
    constructor() public {
        sku = 1;
        upc = 1;
    }
    function manufProd(uint _upc, address _manufID, string memory _descp) public {
        prod[_upc] = Product({
            upc : _upc,
            sku : sku,
            ownerID : _manufID,
            manufID : _manufID,
            descp : _descp,
            productID : sku + upc,
            price : 0,
            state : State.PROCESSED,
            distributorID : address(0),
            retailerID : address(0),
            consumerID : address(0)
        });
        sku = sku + 1;
        emit Processed(_upc);
    }
    function packedProd (uint _upc) public processed(_upc) verifyCaller(prod[_upc].manufID) {
        prod[_upc].state = State.PACKED;
        emit Packed(_upc);
    }
    function soldProd (uint _upc, uint _price) onlyDistr public packed(_upc) {
        prod[_upc].ownerID = msg.sender;
        prod[_upc].distributorID = msg.sender;
        prod[_upc].state = State.SOLD;
        prod[_upc].price = _price;
        emit Sold(_upc);
    }
    function shipProd (uint _upc) public sold(_upc) verifyCaller(prod[_upc].distributorID) {
        prod[_upc].state = State.SHIPPED;
        emit Shipped(_upc);
    }
    function recvProd (uint _upc) public onlyRetl shipped(_upc) {
        prod[_upc].ownerID = msg.sender;
        prod[_upc].retailerID = msg.sender;
        prod[_upc].state = State.RECEIVED;
        emit Received(_upc);
    }
    function purchProd (uint _upc) public onlyRetl received(_upc) {
        prod[_upc].ownerID = msg.sender;
        prod[_upc].consumerID = msg.sender;
        prod[_upc].state = State.PURCHASED;
        emit Purchased(_upc);
    }
    function viewStatus (uint _upc) public view returns (uint $sku, uint $upc, address $ownerID, address $manufID, string memory $descp, uint $productID, uint $price, State $state, address $distributorID,  address $retailerID, address $consumerID) {
        $sku = prod[_upc].sku;
        $upc = prod[_upc].upc;
        $ownerID = prod[_upc].ownerID;
        $manufID = prod[_upc].manufID;
        $descp = prod[_upc].descp;
        $productID = prod[_upc].productID;
        $price = prod[_upc].price;
        $state = prod[_upc].state;
        return ($sku, $upc, $ownerID, $manufID, $descp, $productID, $price, $state, $distributorID, $retailerID, $consumerID);
    }
}