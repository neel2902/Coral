const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
};
const web3 = new Web3(provider, null, OPTIONS);
const { interface, object: bytecode } = require('./compile'); 

let accounts;
let myContract;

before(async function() {

    accounts = await web3.eth.getAccounts()

    myContract = await new web3.eth.Contract(interface)
        .deploy({data: "0x" + evm.bytecode.object, arguments: []})
        .send({from: accounts[0], gas: 5000000});

    console.log("finished")

});
