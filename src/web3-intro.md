# Getting Started with Web3

## Summary

This document will walk you through how to use Web3 on Oasis, including how to connect your Web3-enabled wallet and interact with smart contracts through Web3. For tutorials on deploying contracts on Web3, visit our other docs ([Solidity](./tutorials/deploy-solidity.md) and [Vyper](./tutorials/deploy-vyper.md)). 

- [Intro to Web3](#intro-to-web3)
- [Connecting Wallets](#connecting-wallets)
- [Getting Funded](#getting-funded)
- [Connecting to Oasis.js](#connecting-to-oasis.js)

## Intro to Web3

[Web3.js](https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html) is a Javascript module used by many Ethereum developers to deploy and interact with deployed smart contracts on various Ethereum networks. 
The Oasis network fully supports Web3 interactions, so you can use it to deploy your contracts (read the docs for deploying [Solidity](./tutorials/deploy-solidity.md) and [Vyper](./tutorials/deploy-vyper.md) contracts) and interact with them. 

To use Web3, install it as you would any other module. 

```
npm install web3
```

You're ready to create an application that interacts with the Oasis network. 
In your application, you'll need to include three new dependencies.
1. Web3, obviously.
2. A provider. Web3 requires you to specify a [provider](https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#providers), which can be a `WebsocketProvider`, `IpcProvider` or, in our case, a Hierarchical Deterministic Wallet Provider `truffle-hdwallet-provider`. 
This particular provider manages a set of keys derived from a seed. 
3. The Ethereum Transactions module, `ethereumjs-tx`.

```js
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Tx = require('ethereumjs-tx').Transaction;
```

Initializing the HD Wallet provider requires a seed phrase (or mnemonic) from which it extracts your accounts (private keys and public addresses). 
It also requires a URL to create a connection through which all communication to the network will be done. 
To connect to your local `oasis chain`, use `'http://localhost:8545'` and the menmonic provided to you there. 

```js
const MNEMONIC = 'range drive remove bleak mule satisfy mandate east lion minimum unfold ready';
const URL = 'http://localhost:8545';
const provider = new HDWalletProvider(MNEMONIC, URL);
```

To connect to the Oasis devnet, use the link `'wss://web3.devnet.oasiscloud.io/ws'`. 
You will likely want to connect your own account, i.e. the one you opened through the [Oasis Dashboard](https://dashboard.oasiscloud.io).
You can get your seed phrase like this.

```js
const URL = 'wss://web3.devnet.oasiscloud.io/ws';
const provider = new HDWalletProvider(MNEMONIC, URL);
```

Finally, create your web3 instance.

```js
const web3 = new Web3(provider);
```

Test your connection:
```js
web3.eth.net.isListening()
   .then(() => console.log('Web3 is connected.'))
   .catch(e => console.log('Something went wrong.'));
```

With your web3 instance, you should be able to sign and send transactions without the laborious process of calculating a nonce, creating a raw transaction object, signing it, etc. 
For example, try querying an account balance:

```js
web3.eth.sendTransaction({from: '0xb8b3666d8fea887d97ab54f571b8e5020c5c8b58',to: '0xff8c7955506c8f6ae9df7efbc3a26cc9105e1797', value: 10})
  .then( () => {
    web3.eth.getBalance('0xff8c7955506c8f6ae9df7efbc3a26cc9105e1797')
      .then(console.log)
      .catch(console.log);
  })
  .catch(console.log);
```

## Connecting Wallets

Oasis supports Web3, so any wallet compatible with Web3 (such as the [Metamask](https://metamask.io/) browser extension) can be used to sign and send transactions. 
If you want to use your Metamask wallet, just use your seed phrase (you can get it by going to Settings > Security and Privacy > Reveal Seed Words). 
You can send a transaction on a local `oasis chain` network directly from the Metamask interface. 
Just select `Localhost 8545` from the Networks dropdown menu.


## Getting Funded

Unfortunately, our faucet is now deprecated. The best way to get funded is to email <support@oasislabs.com> with your public address. 

## Connecting to Oasis.js

[`oasis.js`](https://oasis-labs-oasis-client.readthedocs-hosted.com/en/latest/index.html) is our version of Web3, a Javascript SDK for building applications on top of Oasis platform services. 
In `oasis.js`, you use a `wallet` and a `gateway`, similarly to how you needed a `mnemonic` and `URL` in Web3. 

