# ethToken

A standard token on ethereum that can be exchanged and redeemed using ether at a rate of 1 to 1.  
For more details on token standard, you can start at https://tokenstandard.codetract.io/.

#### Advantages of ethToken over normal ether for smart contracts

1. Adds standard token functionalities so that code written for generic tokens can be used for ether
2. Prevents untrusted external calls when the intention is just to transfer ether
3. Reduce number of transactions when using it across different dapps
4. Enables a client to retrieve historical transaction records
