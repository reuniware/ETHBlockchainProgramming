const Web3 = require("web3");

let web3 = new Web3(
    // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
    new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/cc44823998a0412294a47680xxxxxxxx")
    //new Web3.providers.WebsocketProvider("wss://main-light.eth.linkpool.io/ws")
);

//let abi = JSON.parse('[{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]')

const subscription = web3.eth.subscribe("pendingTransactions", (err, res) => {
    if (err) console.error(err);
});

const addresses = {
    sushiswap_factory: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
    sushiswap_router: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
    uniswap_factory: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    uniswap_router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
};

const init = function () {
    subscription.on("data", (txHash) => {
        setTimeout(async () => {
            try {
                let tx = await web3.eth.getTransaction(txHash);
                if (tx !== null) {
                    let show = false;
                    let from = tx.from; let to = tx.to;

                    if (from !== null && from.toLowerCase() === addresses.sushiswap_factory.toLowerCase()) { show = true ; from = 'SushiSwap Factory'}
                    if (to !== null && to.toLowerCase() === addresses.sushiswap_factory.toLowerCase()) { show = true ; to = 'SushiSwap Factory'}
                    if (from !== null && from.toLowerCase() === addresses.sushiswap_router.toLowerCase()) { show = true ; from = 'SushiSwap Router'}
                    if (to !== null && to.toLowerCase() === addresses.sushiswap_router.toLowerCase()) { show = true ; to = 'SushiSwap Router'}

                    if (from !== null && from.toLowerCase() === addresses.uniswap_factory.toLowerCase()) { show = true ; from = 'UniSwap Factory'}
                    if (to !== null && to.toLowerCase() === addresses.uniswap_factory.toLowerCase()) { show = true ; to = 'UniSwap Factory'}
                    if (from !== null && from.toLowerCase() === addresses.uniswap_router.toLowerCase()) { show = true ; from = 'UniSwap Router'}
                    if (to !== null && to.toLowerCase() === addresses.uniswap_router.toLowerCase()) { show = true ; to = 'UniSwap Router'}

                    if (show === true) console.log('FROM [' + from + '] TO [' + to +']' + ' VALUE [' + web3.utils.fromWei(tx.value) + ' eth]')
                }
            } catch (err) {
                console.error(err);
            }
        });
    });
};

init();
