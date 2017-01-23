contract('ETHTokenExchange', function(accounts) {

    it('token starting tokens', function(done) {
        EthToken.new({ from: accounts[0], gas: 4000000 }).then(function(value) {
            token = value;
            return token.balanceOf.call(accounts[0]);
        }).then(function(value) {
            assert.strictEqual(value.toNumber(), 0, 'initial creator token');
            return token.totalSupply.call();
        }).then(function(value) {
            assert.strictEqual(value.toNumber(), 0, 'token totalSupply');
        }).then(done).catch(done);
    });

    it('Testing createToken function', function(done) {
        var exchange = EthToken.deployed();
        var contract = exchange.address;

        exchange.createToken({ from: accounts[1], value: web3.toWei(50, 'ether'), gas: 1000000 }).then(function(success) {
            assert.strictEqual(web3.eth.getBalance(contract).minus(web3.toWei(50, 'ether')).toNumber(), 0, 'contract does not have 50-ether');
            return exchange.balanceOf(accounts[1]);
        }).then(function(balance) {
            assert.strictEqual(balance.minus(web3.toWei(50, 'ether')).toNumber(), 0, 'accounts[1] does not have 50-ether tokens');
            return exchange.createToken({ from: accounts[0], value: web3.toWei(20, 'ether'), gas: 1000000 });
        }).then(function(success) {
            assert.strictEqual(web3.eth.getBalance(contract).minus(web3.toWei(70, 'ether')).toNumber(), 0, 'contract does not have 70-ether');
            return exchange.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.strictEqual(balance.minus(web3.toWei(20, 'ether')).toNumber(), 0, 'accounts[0] does not have 20-ether tokens');
            return exchange.totalSupply.call()
        }).then(function(balance) {
            assert.strictEqual(balance.minus(web3.toWei(70, 'ether')).toNumber(), 0, 'totalSupply does not have 70-ether tokens');
            exchange.LogCreateToken().get(function(error, log) {
                assert.strictEqual(log.length, 1);
                assert.strictEqual(log[0].args._from, accounts[0]);
                assert.strictEqual(log[0].args._value.minus(web3.toWei(20, 'ether')).toNumber(), 0);
                done();
            });
        });
    });

    it('Testing redeemToken function', function(done) {
        var exchange = EthToken.deployed();
        var contract = exchange.address;

        exchange.redeemToken(web3.toWei(10, 'ether'), { from: accounts[1], gas: 1000000 }).then(function(success) {
            assert.strictEqual(web3.eth.getBalance(contract).minus(web3.toWei(60, 'ether')).toNumber(), 0, 'contract eth balance not 60-ether');
            return exchange.balanceOf.call(accounts[1]);
        }).then(function(balance) {
            assert.strictEqual(balance.minus(web3.toWei(40, 'ether')).toNumber(), 0, 'accounts[1] token balance not 40-ether tokens');
            return exchange.balanceOf(contract);
        }).then(function(balance) {
            assert.strictEqual(balance.toNumber(), 0, 'contract token balance not 0-ether tokens');
            return exchange.totalSupply.call();
        }).then(function(balance) {
            assert.strictEqual(balance.minus(web3.toWei(60, 'ether')).toNumber(), 0, 'totalSupply does not have 60-ether tokens');
            exchange.redeemToken(web3.toWei(40, 'ether'), { from: accounts[1], gas: 1000000 });
            return exchange.redeemToken(web3.toWei(20, 'ether'), { from: accounts[0], gas: 1000000 });
        }).then(function(success) {
            assert.strictEqual(web3.eth.getBalance(contract).toNumber(), 0, 'contract eth balance not 0-ether');
            return exchange.totalSupply.call();
        }).then(function(balance) {
            assert.strictEqual(balance.toNumber(), 0, 'totalSupply does not have 0-ether tokens');
            return exchange.balanceOf(accounts[1]);
        }).then(function(balance) {
            assert.strictEqual(balance.toNumber(), 0, 'accounts[1] does not have 0-ether tokens');
            return exchange.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.strictEqual(balance.toNumber(), 0, 'accounts[0] does not have 0-ether tokens');
            exchange.LogRedeemToken().get(function(error, log) {
                assert.strictEqual(log.length, 1);
                assert.strictEqual(log[0].args._from, accounts[0]);
                assert.strictEqual(log[0].args._value.minus(web3.toWei(20, 'ether')).toNumber(), 0);
                done();
            });
        });
    });

});
