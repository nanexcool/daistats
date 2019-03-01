import Web3 from 'web3'

let web3 = new Web3("wss://parity1.makerfoundation.com:18546")
// let web3 = new Web3("https://parity1.makerfoundation.com:18545")
// let eth = new Eth("wss://mainnet.infura.io/ws")
// if (window.ethereum) {
//   eth = new Eth(window.ethereum)
//   console.log('modern ethereum browser')
// }
// else if (window.web3) {
//   eth = new Eth(window.web3.currentProvider)
//   console.log('legacy ethereum browser')
// }
// else {
//   console.log('Non-Ethereum browser detected.')
//   eth = new Eth("wss://mainnet.infura.io/ws")
// }
export default web3

// export const utils = Utils

