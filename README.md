# ethToken

A standard token on ethereum that can be exchanged and redeemed using ether at a rate of 1 to 1.  
For more details on token standard, you can start at https://tokenstandard.codetract.io/.

#### Advantages of ethToken over normal ether for smart contracts

1. Adds standard token functionalities so that code written for generic tokens can be used for ether
2. Prevents untrusted external calls when the intention is just to transfer ether
3. Reduce number of transactions when using it across different dapps
4. Enables a client to retrieve historical transaction records

#### Smart contract address

* Ethereum `0x6e01ee36b522a824609b7F7DfB5e4AA8Fbb48934`
* Ropsten `0x950041C1599529a9f64cF2be59fFb86072f00111`

#### Functions in addition to standard token

##### `createToken()`

[EthToken.sol:115-131](https://github.com/codetract/ethToken/blob/master/contracts/EthToken.sol#L115-L131)

##### `redeemToken(uint256 _tokens)`

[EthToken.sol:133-157](https://github.com/codetract/ethToken/blob/master/contracts/EthToken.sol#L133-L157)
