contract('ethTokenThorough', function(accounts) {
    it('createToken', function(done) {
        var ethToken = EthToken.deployed();
        ethToken.createToken({ from: accounts[1], value: web3.toWei(50.132, 'ether'), gas: 1000000 }).then(function(result) {
            return web3.eth.getBalance(ethToken.address);
        }).then(function(result) {
            assert.strictEqual(result.minus(web3.toWei(50.132, 'ether')).toNumber(), 0);
            return ethToken.balanceOf(accounts[1]);
        }).then(function(result) {
            assert.strictEqual(result.minus(web3.toWei(50.132, 'ether')).toNumber(), 0);
            return ethToken.createToken({ from: accounts[1], gas: 1000000 });
        }).catch(function(result) {
            return ethToken.balanceOf(accounts[1]);
        }).then(function(result) {
            assert.strictEqual(result.minus(web3.toWei(50.132, 'ether')).toNumber(), 0);
        }).then(done);
    });
    it('redeemToken', function(done) {
        var ethToken = EthToken.deployed();
        ethToken.redeemToken(web3.toWei(0.132, 'ether'), { from: accounts[1], gas: 1000000 }).then(function(result) {
            return web3.eth.getBalance(ethToken.address);
        }).then(function(result) {
            assert.strictEqual(result.minus(web3.toWei(50, 'ether')).toNumber(), 0);
            return ethToken.balanceOf(accounts[1]);
        }).then(function(result) {
            assert.strictEqual(result.minus(web3.toWei(50, 'ether')).toNumber(), 0);
            return ethToken.redeemToken(0, { from: accounts[1], gas: 1000000 });
        }).catch(function(result) {
            return ethToken.redeemToken(web3.toWei(100, 'ether'), { from: accounts[1], gas: 1000000 });
        }).catch(function(result) {
            return web3.eth.getBalance(ethToken.address);
        }).then(function(result) {
            assert.strictEqual(result.minus(web3.toWei(50, 'ether')).toNumber(), 0);
        }).then(done);
    });
});
