//adapted from https://github.com/ConsenSys/Tokens/blob/master/Token_Contracts/test/humanStandardToken.js
contract('humanStandardToken', function(accounts) {
    it('creation: should create an initial balance for the creator', function(done) {
        var ethToken = EthToken.deployed();
        ethToken.balanceOf.call(accounts[0]).then(function(result) {
            assert.strictEqual(result.toNumber(), 0);
            return ethToken.totalSupply.call();
        }).then(function(result) {
            assert.strictEqual(result.toNumber(), 0);
            done();
        }).catch(done);
    });
});
contract('humanStandardToken', function(accounts) {
    it('creation: test correct setting of vanity information', function(done) {
        var ethToken = EthToken.deployed();
        ethToken.name.call().then(function(result) {
            assert.strictEqual(result, 'ETH Token');
            return ethToken.decimals.call();
        }).then(function(result) {
            assert.strictEqual(result.toNumber(), 18);
            return ethToken.symbol.call();
        }).then(function(result) {
            assert.strictEqual(result, 'Ξ');
            return ethToken.version.call();
        }).then(function(result) {
            assert.strictEqual(result, '0.2');
            done();
        }).catch(done);
    });
});
// contract('humanStandardToken', function(accounts) {
//     it('creation: should succeed in creating over 2^256 - 1 (max) tokens', function(done) {
//         //2^256 - 1
//         var ethToken = EthToken.deployed();
//         ethToken.create('115792089237316195423570985008687907853269984665640564039457584007913129639935', 1, { from: accounts[0], gas: 1000000 }).then(function(result) {
//             return ethToken.totalSupply.call();
//         }).then(function(result) {
//             var match = result.equals('1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+77');
//             assert.isTrue(match);
//             done();
//         }).catch(done);
//     });
// });
// contract('humanStandardToken', function(accounts) {
//
//     //TRANSERS
//     //normal transfers without approvals.
//
//     //this is not *good* enough as the contract could still throw an error otherwise.
//     //ideally one should check balances before and after, but estimateGas currently always throws an error.
//     //it's not giving estimate on gas used in the event of an error.
//     it('transfers: ether transfer should be reversed.', function(done) {
//         var ethToken = EthToken.deployed();
//         ethToken.name.call().then(function(result) {
//             return web3.eth.sendTransaction({ from: accounts[0], to: ethToken.address, value: web3.toWei('10', 'Ether'), gas: 1000000 });
//         }).catch(function(result) {
//             assert.isTrue((result + '').includes('invalid JUMP'));
//             done();
//         }).catch(done);
//     });
// });
contract('humanStandardToken', function(accounts) {
    it('transfers: should transfer 10000 to accounts[1] with accounts[0] having 10000', function(done) {
        var ethToken = EthToken.deployed();
        ethToken.createToken({ from: accounts[0], value: 10000, gas: 100000 }).then(function(result) {
            return ethToken.transfer(accounts[1], 10000, { from: accounts[0], gas: 100000 });
        }).then(function(result) {
            return ethToken.balanceOf.call(accounts[1]);
        }).then(function(result) {
            assert.strictEqual(result.toNumber(), 10000);
            return ethToken.balanceOf.call(accounts[0]);
        }).then(function(result) {
            assert.strictEqual(result.toNumber(), 0);
            done();
        }).catch(done);
    });
});
contract('humanStandardToken', function(accounts) {
    it('transfers: should fail when trying to transfer 10001 to accounts[1] with accounts[0] having 10000', function(done) {
        var ethToken = EthToken.deployed();
        ethToken.createToken({ from: accounts[0], value: 10000, gas: 100000 }).then(function(result) {
            return ethToken.transfer.call(accounts[1], 10001, { from: accounts[0], gas: 100000 });
        }).then(function(result) {
            assert.isFalse(result);
            done();
        }).catch(done);
    });
});
contract('humanStandardToken', function(accounts) {
    it('transfers: should fail when trying to transfer zero.', function(done) {
        var ethToken = EthToken.deployed();
        ethToken.createToken({ from: accounts[0], value: 10000, gas: 100000 }).then(function(result) {
            return ethToken.transfer.call(accounts[1], 0, { from: accounts[0], gas: 100000 });
        }).then(function(result) {
            assert.isFalse(result);
            done();
        }).catch(done);
    });
});

//NOTE: testing uint256 wrapping is impossible in this standard token since you can't supply > 2^256 -1.

//todo: transfer max amounts.

//APPROVALS
contract('humanStandardToken', function(accounts) {
    it('approvals: msg.sender should approve 100 to accounts[1]', function(done) {
        var ethToken = EthToken.deployed();
        ethToken.approve(accounts[1], 100, { from: accounts[0], gas: 100000 }).then(function(result) {
            return ethToken.allowance.call(accounts[0], accounts[1]);
        }).then(function(result) {
            assert.strictEqual(result.toNumber(), 100);
            done();
        }).catch(done);
    });
});
// contract('humanStandardToken', function(accounts) {
//     it('approvals: msg.sender should approve 100 to SampleRecipient and then NOTIFY SampleRecipient. It should succeed.', function(done) {
//         var ethToken = EthToken.deployed();
//         var sampleEthToken = null;
//         SampleRecipientSuccess.new({ from: accounts[0], gas: 1000000 }).then(function(result) {
//             sampleEthToken = result;
//             return ethToken.approveAndCall(sampleethToken.address, 100, '0x42', { from: accounts[0], gas: 1000000 });
//         }).then(function(result) {
//             return ethToken.allowance.call(accounts[0], sampleethToken.address);
//         }).then(function(result) {
//             assert.strictEqual(result.toNumber(), 100);
//             return sampleethToken.value.call();
//         }).then(function(result) {
//             assert.strictEqual(result.toNumber(), 100);
//             done();
//         }).catch(done);
//     });
// });
// contract('humanStandardToken', function(accounts) {
//     it('approvals: msg.sender should approve 100 to SampleRecipient and then NOTIFY SampleRecipient and throw.', function(done) {
//         var ethToken = EthToken.deployed();
//         var sampleEthToken = null;
//         SampleRecipientThrow.new({ from: accounts[0], gas: 1000000 }).then(function(result) {
//             sampleEthToken = result;
//             return ethToken.approveAndCall(sampleethToken.address, 100, '0x42', { from: accounts[0], gas: 1000000 });
//         }).catch(function(result) {
//             //It will catch OOG.
//             assert.isTrue((result + '').includes('out of gas'));
//             done();
//         }).catch(done)
//     });
// });
contract('humanStandardToken', function(accounts) {
    //bit overkill. But is for testing a bug
    it('approvals: msg.sender approves accounts[1] of 100 & withdraws 20 once.', function(done) {
        var ethToken = EthToken.deployed();
        ethToken.createToken({ from: accounts[0], value: 10000, gas: 100000 }).then(function(result) {
            return ethToken.approve(accounts[1], 100, { from: accounts[0], gas: 100000 });
        }).then(function(result) {
            return ethToken.balanceOf.call(accounts[2]);
        }).then(function(result) {
            assert.strictEqual(result.toNumber(), 0);
            return ethToken.allowance.call(accounts[0], accounts[1]);
        }).then(function(result) {
            assert.strictEqual(result.toNumber(), 100);
            return ethToken.transferFrom.call(accounts[0], accounts[2], 20, { from: accounts[1] });
        }).then(function(result) {
            return ethToken.transferFrom(accounts[0], accounts[2], 20, { from: accounts[1], gas: 100000 });
        }).then(function(result) {
            return ethToken.allowance.call(accounts[0], accounts[1]);
        }).then(function(result) {
            assert.strictEqual(result.toNumber(), 80);
            return ethToken.balanceOf.call(accounts[2]);
        }).then(function(result) {
            assert.strictEqual(result.toNumber(), 20);
            return ethToken.balanceOf.call(accounts[0]);
        }).then(function(result) {
            assert.strictEqual(result.minus(10000).plus(20).toNumber(), 0);
            done();
        }).catch(done);
    });
});
contract('humanStandardToken', function(accounts) {
    //should approve 100 of msg.sender & withdraw 50, twice. (should succeed)
    it('approvals: msg.sender approves accounts[1] of 100 & withdraws 20 twice.', function(done) {
        var ethToken = EthToken.deployed();
        ethToken.createToken({ from: accounts[0], value: 10000, gas: 100000 }).then(function(result) {
            return ethToken.approve(accounts[1], 100, { from: accounts[0], gas: 100000 });
        }).then(function(result) {
            return ethToken.allowance.call(accounts[0], accounts[1]);
        }).then(function(result) {
            assert.strictEqual(result.toNumber(), 100);
            return ethToken.transferFrom(accounts[0], accounts[2], 20, { from: accounts[1], gas: 100000 });
        }).then(function(result) {
            return ethToken.allowance.call(accounts[0], accounts[1]);
        }).then(function(result) {
            assert.strictEqual(result.toNumber(), 80);
            return ethToken.balanceOf.call(accounts[2]);
        }).then(function(result) {
            assert.strictEqual(result.toNumber(), 20);
            return ethToken.balanceOf.call(accounts[0]);
        }).then(function(result) {
            assert.strictEqual(result.minus(10000).plus(20).toNumber(), 0);
            //FIRST tx done.
            //onto next.
            return ethToken.transferFrom(accounts[0], accounts[2], 20, { from: accounts[1], gas: 100000 });
        }).then(function(result) {
            return ethToken.allowance.call(accounts[0], accounts[1]);
        }).then(function(result) {
            assert.strictEqual(result.toNumber(), 60);
            return ethToken.balanceOf.call(accounts[2]);
        }).then(function(result) {
            assert.strictEqual(result.toNumber(), 40);
            return ethToken.balanceOf.call(accounts[0]);
        }).then(function(result) {
            assert.strictEqual(result.minus(10000).plus(40).toNumber(), 0);
            done();
        }).catch(done);
    });
});
contract('humanStandardToken', function(accounts) {
    //should approve 100 of msg.sender & withdraw 50 & 60 (should fail).
    it('approvals: msg.sender approves accounts[1] of 100 & withdraws 50 & 60 (2nd tx should fail)', function(done) {
        var ethToken = EthToken.deployed();
        ethToken.createToken({ from: accounts[0], value: 10000, gas: 100000 }).then(function(result) {
            return ethToken.approve(accounts[1], 100, { from: accounts[0], gas: 100000 });
        }).then(function(result) {
            return ethToken.allowance.call(accounts[0], accounts[1]);
        }).then(function(result) {
            assert.strictEqual(result.toNumber(), 100);
            return ethToken.transferFrom(accounts[0], accounts[2], 50, { from: accounts[1] });
        }).then(function(result) {
            return ethToken.allowance.call(accounts[0], accounts[1]);
        }).then(function(result) {
            assert.strictEqual(result.toNumber(), 50);
            return ethToken.balanceOf.call(accounts[2]);
        }).then(function(result) {
            assert.strictEqual(result.toNumber(), 50);
            return ethToken.balanceOf.call(accounts[0]);
        }).then(function(result) {
            assert.strictEqual(result.minus(10000).plus(50).toNumber(), 0);
            //FIRST tx done.
            //onto next.
            return ethToken.transferFrom.call(accounts[0], accounts[2], 60, { from: accounts[1] });
        }).then(function(result) {
            assert.isFalse(result);
            done();
        }).catch(done);
    });
});
contract('humanStandardToken', function(accounts) {
    it('approvals: attempt withdrawal from acconut with no allowance (should fail)', function(done) {
        var ethToken = EthToken.deployed();
        ethToken.createToken({ from: accounts[0], value: 10000, gas: 100000 }).then(function(result) {
            return ethToken.transferFrom.call(accounts[0], accounts[2], 60, { from: accounts[1] });
        }).then(function(result) {
            assert.isFalse(result);
            done();
        }).catch(done);
    });
});
contract('humanStandardToken', function(accounts) {
    it('approvals: allow accounts[1] 100 to withdraw from accounts[0]. Withdraw 60 and then approve 0 & attempt transfer.', function(done) {
        var ethToken = EthToken.deployed();
        ethToken.createToken({ from: accounts[0], value: 10000, gas: 100000 }).then(function(result) {
            return ethToken.approve(accounts[1], 100, { from: accounts[0], gas: 100000 });
        }).then(function(result) {
            return ethToken.transferFrom(accounts[0], accounts[2], 60, { from: accounts[1] });
        }).then(function(result) {
            return ethToken.approve(accounts[1], 0, { from: accounts[0], gas: 100000 });
        }).then(function(result) {
            return ethToken.transferFrom.call(accounts[0], accounts[2], 10, { from: accounts[1] });
        }).then(function(result) {
            assert.isFalse(result);
            done();
        }).catch(done);
    });
});
contract('humanStandardToken', function(accounts) {
    it('approvals: approve max (2^256 - 1)', function(done) {
        var ethToken = EthToken.deployed();
        ethToken.approve(accounts[1], '115792089237316195423570985008687907853269984665640564039457584007913129639935', { from: accounts[0], gas: 100000 }).then(function(result) {
            return ethToken.allowance.call(accounts[0], accounts[1]);
        }).then(function(result) {
            var match = result.equals('1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+77');
            assert.isTrue(match);
            done();
        }).catch(done);
    });
});
