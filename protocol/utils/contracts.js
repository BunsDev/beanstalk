const fs = require('fs');
const beanstalkABI = require("../abi/Beanstalk.json");
const { BEANSTALK, BEAN, BEAN_3_CURVE, USDC, FERTILIZER, PRICE, WETH, ETH_USD_CHAINLINK_ORACLE } = require('../test/utils/constants');

async function getBeanstalk() {
    return await ethers.getContractAt(beanstalkABI, BEANSTALK);
}

async function getAltBeanstalk(address) {
    return await ethers.getContractAt(beanstalkABI, address);
}

async function getBeanstalkAdminControls() {
    return await ethers.getContractAt('MockAdminFacet', BEANSTALK);
}

async function getBean() {
    return await ethers.getContractAt('Bean', BEAN);
}

async function getUsdc() {
    return await ethers.getContractAt('IBean', USDC);
}

async function getWeth() {
    return await ethers.getContractAt('IBean', WETH);
}

async function getPrice() {
    return await ethers.getContractAt('BeanstalkPrice', PRICE)
}

async function getBeanMetapool() {
    return await ethers.getContractAt('ICurvePool', BEAN_3_CURVE);
}

async function getFertilizerPreMint() {
    return await ethers.getContractAt('FertilizerPreMint', FERTILIZER)
}

async function getFertilizer() {
    return await ethers.getContractAt('Fertilizer', FERTILIZER)
}

async function getEthUsdChainlinkOracle() {
    return await ethers.getContractAt('IChainlinkOracle', ETH_USD_CHAINLINK_ORACLE)
}

exports.getBeanstalk = getBeanstalk;
exports.getBean = getBean;
exports.getUsdc = getUsdc;
exports.getWeth = getWeth;
exports.getPrice = getPrice;
exports.getBeanMetapool = getBeanMetapool;
exports.getBeanstalkAdminControls = getBeanstalkAdminControls;
exports.getFertilizerPreMint = getFertilizerPreMint
exports.getFertilizer = getFertilizer
exports.getAltBeanstalk = getAltBeanstalk
exports.getEthUsdChainlinkOracle = getEthUsdChainlinkOracle