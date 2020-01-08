const ethers = require('ethers')
ethers.errors.setLogLevel("error")
window.ethers = ethers
const eth = ethers.getDefaultProvider()
export default eth
