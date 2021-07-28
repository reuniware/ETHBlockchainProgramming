const Web3 = require("web3");

let web3 = new Web3(
    // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
    new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/cc44823998a0412294a4768078fcbfd1")
);

const subscription = web3.eth.subscribe("pendingTransactions", (err, res) => {
    if (err) console.error(err);
});

const init = function () {
    subscription.on("data", (txHash) => {
        setTimeout(async () => {
            try {
                let tx = await web3.eth.getTransaction(txHash);
                console.log(tx)
            } catch (err) {
                console.error(err);
            }
        });
    });
};

init();
