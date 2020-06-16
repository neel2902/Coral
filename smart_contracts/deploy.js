// const { interface, object: bytecode } = require('./compile'); 
// const HDWalletProvider = require('truffle-hdwallet-provider');
// const Web3 = require('web3');
// const mnemonic = "reward extend alien rival slice only timber skin oven critic sorry reflect";

// const provider = new HDWalletProvider(
//   mnemonic,
//   'https://rinkeby.infura.io/v3/1293ed76ae6a434980e12ff7716a6ead'
// );
// const web3 = new Web3(provider);

// const deploy = async () => {
//   const accounts = await web3.eth.getAccounts();

//   console.log('Attempting to deploy from account', accounts[0]);

//   const result = await new web3.eth.Contract(interface)
//     .deploy({ data: "0x" + bytecode })
//     .send({ from: accounts[0] });

//   console.log('Contract deployed to', result.options.address);
// };
// deploy();


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