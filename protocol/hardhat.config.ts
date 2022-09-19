import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
// import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-contract-sizer'
import "hardhat-gas-reporter"
import "solidity-coverage"
import "@openzeppelin/hardhat-upgrades"

import { HardhatUserConfig, task } from "hardhat/config";
// import { ethers } from "hardhat"

require('dotenv').config();
import { impersonateSigner, mintUsdc, mintBeans, getBeanMetapool, getUsdc, getBean, getBeanstalkAdminControls, buyBuysInBeanEth, sellBeansInBeanEth, printPools } from './utils';

///
const fs = require('fs')
const { EXTERNAL, INTERNAL, INTERNAL_EXTERNAL, INTERNAL_TOLERANT } = require('./test/utils/balances.js')
const { PUBLIUS, BEAN_3_CURVE } = require('./test/utils/constants.js')  
const { to6 } = require('./test/utils/helpers.js')
const { replant } = require("./replant/replant.js")
const { deployWells } = require("./scripts/wells.js")

task('testTask', async () => {
  console.log('Worked!');
});

// task('buyBeansCurve').addParam("amount", "The amount of USDC to buy with").setAction(async(args) => {
//   await mintUsdc(PUBLIUS, args.amount)
//   const signer = await impersonateSigner(PUBLIUS)
//   await (await getUsdc()).connect(signer).approve(BEAN_3_CURVE, ethers.constants.MaxUint256)
//   await (await getBeanMetapool()).connect(signer).exchange_underlying('2', '0', args.amount, '0')
// })

// task('sellBeansCurve').addParam("amount", "The amount of Beans to sell").setAction(async(args) => {
//   await mintBeans(PUBLIUS, args.amount)
//   const signer = await impersonateSigner(PUBLIUS)
//   await (await getBean()).connect(signer).approve(BEAN_3_CURVE, ethers.constants.MaxUint256)
//   await (await getBeanMetapool()).connect(signer).connect(await impersonateSigner(PUBLIUS)).exchange_underlying('0', '2', args.amount, '0')
// })

task('ripen').addParam("amount", "The amount of Pods to ripen").setAction(async(args) => {
  const beanstalkAdmin = await getBeanstalkAdminControls()
  await beanstalkAdmin.ripen(args.amount)
})

task('fertilize').addParam("amount", "The amount of Beans to fertilize").setAction(async(args) => {
  const beanstalkAdmin = await getBeanstalkAdminControls()
  await beanstalkAdmin.fertilize(args.amount)
})

task('rewardSilo').addParam("amount", "The amount of Beans to distribute to Silo").setAction(async(args) => {
  const beanstalkAdmin = await getBeanstalkAdminControls()
  await beanstalkAdmin.rewardSilo(args.amount)
})

task('sunrise', async function () {
  const beanstalkAdmin = await getBeanstalkAdminControls()
  await beanstalkAdmin.forceSunrise()
})

task('replant', async () => {
  const account = await impersonateSigner(PUBLIUS)
  await replant(account)
})


// Wells

task('wells', async function () {
  await deployWells()
})

task('pools', async function () {
  await printPools()
})

// buys amount Beans. Pads amount with 6 zeros. change to6 to toBN to not pad with zeros.
task('buyBeansWell')
  .addParam("amount", "The amount of Beans to buy")
  .addParam("account", "The account to buy beans with")
  .setAction(async(args) => {
    await sellBeansInBeanEth(args.account, to6(args.amount))
})

// Sells X Beans. Pads amount with 6 zeros. change to6 to toBN to not pad with zeros.
task("sellBeansWell")
  .addParam("amount", "The amount of Beans to sell")
  .addParam("account", "The account to sell beans with")
  .setAction(async(args) => {
    await sellBeansInBeanEth(args.account, to6(args.amount))
})

task('diamondABI', 'Generates ABI file for diamond, includes all ABIs of facets', async () => {
  const basePath = '/contracts/farm/facets/'
  const libraryBasePath = '/contracts/farm/libraries/'
  let files = fs.readdirSync('.' + basePath)
  let abi : any[] = []
  for (var file of files) {
    var file2
    var jsonFile
    if (file.includes('Facet')) {
      if (!file.includes('.sol')) {
        jsonFile = `${file}.json`
        file = `${file}/${file}.sol`
      } else {
        jsonFile = file.replace('sol', 'json');
      }
      let json = fs.readFileSync(`./artifacts${basePath}${file}/${jsonFile}`)
      json = JSON.parse(json)
      abi.push(...json.abi)
    }
  }
  const output = JSON.stringify(abi.filter((item, pos) => abi.map((a)=>a.name).indexOf(item.name) == pos), null, 4)
  fs.writeFileSync('./abi/Beanstalk.json', output)
  console.log('ABI written to abi/Beanstalk.json')
})

const config : HardhatUserConfig = {
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      chainId: 1337,
      forking: process.env.FORKING_RPC ? {
        url: process.env.FORKING_RPC,
        blockNumber: process.env.BLOCK_NUMBER ? parseInt(process.env.BLOCK_NUMBER) : undefined
      } : undefined,
      allowUnlimitedContractSize:true
    },
    localhost: {
      chainId: 1337,
      url: "http://127.0.0.1:8545/",
      timeout: 100000
    },
    mainnet: {
      chainId: 1,
      url: process.env.MAINNET_RPC || '',
      timeout: 100000
    },
    custom: {
      chainId: 133137,
      url: "<CUSTOM_URL>",
      timeout: 100000
    },
  },
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_KEY || ''
  // },
  solidity: {
    version: "0.7.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
  // gasReporter: {
  //   enabled: false
  // },
  mocha: {
    timeout: 100000000
  }
}

export default config;