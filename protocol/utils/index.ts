// import { ethers } from 'hardhat';

// const { getBeanstalk, getBean, getBeanMetapool, getUsdc, getBeanstalkAdminControls, getPrice, getEthUsdChainlinkOracle } = require("./contracts.js");
// const { impersonateSigner, impersonateBeanstalkOwner } = require("./signer.js");
// const { getEthUsdPrice } = require("./oracle.js")
// const { mintUsdc, mintBeans, mintEth } = require("./mint.js")
// const { readPrune } = require("./read.js")
// const { printPools, printPool } = require('./price.js')
// const { sellBeansInBeanEth, buyBuysInBeanEth } = require('./wells.js')

import ethers from 'ethers';

// const hre = require('hardhat');

export function toBN(a: any) {
  return ethers.BigNumber.from(a)
}

export * from './contracts';
export * from './signer';
export * from './oracle';
export * from './mint';
export * from './read';
export * from './price';
export * from './wells';

// exports.toBN = toBN
// exports.getBeanstalk = getBeanstalk
// exports.getBean = getBean
// exports.getBeanMetapool = getBeanMetapool
// exports.getUsdc = getUsdc
// exports.getBeanstalkAdminControls = getBeanstalkAdminControls
// exports.impersonateSigner = impersonateSigner
// exports.impersonateBeanstalkOwner = impersonateBeanstalkOwner
// exports.getEthUsdChainlinkOracle = getEthUsdChainlinkOracle
// exports.mintUsdc = mintUsdc
// exports.mintBeans = mintBeans
// exports.mintEth = mintEth
// exports.getPrice = getPrice
// exports.readPrune = readPrune
// exports.getEthUsdPrice = getEthUsdPrice
// exports.printPools = printPools
// exports.printPool = printPool
// exports.sellBeansInBeanEth = sellBeansInBeanEth
// exports.buyBuysInBeanEth = buyBuysInBeanEth