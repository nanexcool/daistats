#!/usr/bin/env node
const ethers = require('ethers')
const RAY = ethers.utils.bigNumberify(10).pow(27)
const rmul = (x, y) => x.mul(y).add(RAY.div(2)).div(RAY)
const rpow = (x, n) => {
  let z = n.mod(2) != 0 ? x : RAY
  for (n = n.div(2); n != 0; n = n.div(2)) {
    x = rmul(x, x)
    if (n.mod(2) != 0) {
      z = rmul(z, x)
    }
  }
  return z
}
const x = ethers.utils.bigNumberify("1000000001090862085746321732")
const n = ethers.utils.bigNumberify(60 * 60 * 24 * 365)
const z = rpow(x, n)
console.log(z.toString())
let fee = ethers.utils.formatUnits(z, 27)
console.log(parseFloat(fee)*100-100)
