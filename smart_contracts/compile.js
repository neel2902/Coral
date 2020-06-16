const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Main.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
      'Main.sol': {
        content: source
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };
   
//   var output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Main.sol'].Chain.abi;
  var output2 = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Main.sol'].Chain.evm.bytecode;

console.log(output2);
//   const { abi: interface, evm: { bytecode: { object } } } = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Main.sol'].Templatename; 

//   module.exports = { interface, object };

//   console.log(interface, o)