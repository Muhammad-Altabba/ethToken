pragma solidity ^0.4.6;

contract EthTokenInterface {
    function totalSupply() constant returns(uint256) {}

    function transfer(address _to, uint256 _value) returns(bool success);

    function transferFrom(address _from, address _to, uint256 _value) returns(bool success);

    function balanceOf(address _owner) constant returns(uint256 balance);

    function approve(address _spender, uint256 _value) returns(bool success);

    function allowance(address _owner, address _spender) constant returns(uint256 remaining);

    function name() constant returns(string) {}

    function decimals() constant returns(uint8) {}

    function symbol() constant returns(string) {}

    function version() constant returns(string) {}

    function createToken() payable returns(bool success);

    function redeemToken(uint256 _tokens) returns(bool success);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    event LogCreateToken(address indexed _from, uint256 _value);
    event LogRedeemToken(address indexed _from, uint256 _value);
}
