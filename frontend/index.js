const contractABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "hello",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    }
];
const contactAddress = "0x406e5649C8A793635a03ee2659baa28A7e3160b2";
const web3 = new Web3('http://localhost:9545');

const helloWorld = new web3.eth.Contract(contractABI, contactAddress);

document.addEventListener('DOMContentLoaded', () => {
    helloWorld.methods.hello().call()
        .then(result => {
            document.getElementById('data').innerHTML = result;
        })
        .catch(err => console.log(err));
});