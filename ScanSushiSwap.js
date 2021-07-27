const Web3 = require("web3");

let web3 = new Web3(
    // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
    new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/cc44823998a0412294a47680xxxxxxxx")
);

let abi = JSON.parse('[{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]')

// uniswap
//const instance = new web3.eth.Contract(abi, '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f');
// sushiswap
const instance = new web3.eth.Contract(abi, '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2');

setInterval(getNextBlock, 2500)


let previousBlock = -1

function getNextBlock() {
    web3.eth.getBlockNumber().then( block => {

        if (previousBlock === -1) {
            previousBlock = block
        } else {
            if (block === previousBlock) {
                //console.log('same block')
            } else {
                previousBlock = block
                console.log('New block number = ' + block)
                instance.getPastEvents(
                    "allEvents",
                    {fromBlock: block-1, toBlock: block},
                    (errors, events) => {
                        if (!errors) {
                        }
                    }
                ).then(events => {
                    if (events) {
                        //console.log(events)
                        events.forEach(event => {
                            console.log(event.transactionHash)
                            web3.eth.getTransaction(event.transactionHash, function(err, receipt) {
                                console.log(receipt.from + ' ' + receipt.to)
                            })

                        })
                    }
                });
            }
        }

    })
}
