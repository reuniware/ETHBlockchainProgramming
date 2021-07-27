const Web3 = require("web3");

let web3 = new Web3(
    // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
    new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/cc44823998a0412294a4768078fcbfd1")
);

setInterval(getNextBlock, 2500)

let previousBlock = -1

function getNextBlock() {
    web3.eth.getBlockNumber().then( block => {

        if (previousBlock === -1) {
            previousBlock = block
        } else {
            if (block === previousBlock) {
                console.log('same block')
            } else {
                previousBlock = block
                console.log('New block number = ' + block)
            }
        }

    })
}

