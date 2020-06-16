// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "./Manufacturer.sol";
import "./Distributor.sol";
import "./Retailer.sol";
import "./Consumer.sol";

contract Chain is Manufacturer, Consumer, Retailer, Distributor {
    address public God;

    uint upc; // Universal Product Code
    uint sku; // Stock Keeping Unit
    mapping (uint => Product) prod;
    mapping (uint => string[]) itemsHistory;
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
        require (msg.sender == _addr, "Sender not authorized.");
        _;
    }
    modifier processed (uint _upc) {
        require(prod[_upc].state == State.PROCESSED, "requirement not fulfilled.");
        _;
    }
    modifier packed (uint _upc) {
        require(prod[_upc].state == State.PACKED, "requirement not fulfilled");
        _;
    }
    modifier sold (uint _upc) {
        require(prod[_upc].state == State.SOLD, "requirement not fulfilled");
        _;
    }
    modifier shipped (uint _upc) {
        require(prod[_upc].state == State.SHIPPED, "requirement not fulfilled");
        _;
    }
    modifier received (uint _upc) {
        require(prod[_upc].state == State.RECEIVED, "requirement not fulfilled");
        _;
    }
    modifier purchased (uint _upc) {
        require(prod[_upc].state == State.PURCHASED, "requirement not fulfilled");
        _;
    }
    modifier onlyOwner() {
        require(isOwner(), "Sender unauthorised");
        _;
    }
    function isOwner() public view returns (bool) {
        require(msg.sender == God, "Sender not God");
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
    function soldProd (uint _upc, uint _price) public onlyDistr packed(_upc) {
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
    function purchProd (uint _upc) public onlyCons received(_upc) {
        prod[_upc].ownerID = msg.sender;
        prod[_upc].consumerID = msg.sender;
        prod[_upc].state = State.PURCHASED;
        emit Purchased(_upc);
    }
}

