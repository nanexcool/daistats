import Eth from 'web3-eth'
import web3utils from 'web3-utils'

const eth = new Eth()
console.log(eth)
export default eth

export const utils = web3utils

export const initWeb3 = eth => {
  if (window.ethereum) {
    eth.setProvider(window.ethereum)
    console.log('modern ethereum browser')
  }
  else if (window.web3) {
    eth.setProvider(window.web3.currentProvider)
    console.log('legacy ethereum browser')
  }
  else {
    console.log('Non-Ethereum browser detected.')
    eth.setProvider(new Eth.providers.WebsocketProvider("wss://mainnet.infura.io/ws"))
  }
}
