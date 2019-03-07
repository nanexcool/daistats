const ethers = require('ethers')
window.ethers = ethers
const eth = new ethers.providers.InfuraProvider('homestead','4525cb9262b24bbcaf6ac079efd887bf')
export default eth

