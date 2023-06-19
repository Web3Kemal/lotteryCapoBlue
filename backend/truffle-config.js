const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
module.exports = {
  mocha: {},
  compilers: {
    solc: {
      version: '0.8.15'
    }
  },
  networks: {
    bsc_testnet: {
      network_id: 97,
      gasPrice: 20e9,
      provider: new HDWalletProvider(fs.readFileSync('/Users/kevin/key.env', 'utf-8'), "https://data-seed-prebsc-1-s1.binance.org:8545/")
    }
  }
};
