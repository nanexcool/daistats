const ethers = require('ethers')
window.ethers = ethers
const eth = new ethers.providers.InfuraProvider()
export default eth
