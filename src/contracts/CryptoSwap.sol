pragma solidity >=0.4.21 <0.6.0;

import "./Token.sol";

contract CryptoSwap {
    string public name = "CryptoSwap Instant Exchange";
    Token public token;
    uint public rate = 100;

    event TokensPurchased(
        address account, 
        address token, 
        uint amount,
        uint rate
        ); 
    
    event TokensSold(
        address account, 
        address token, 
        uint amount,
        uint rate);

    constructor(Token _token) public{
    token = _token;
    }

    function buyTokens()public payable {
    //Calculate number of token amount
    uint tokenAmount = msg.value*rate;
    //require it has enough tokens
    require(token.balanceOf(address(this))>=tokenAmount);
    token.transfer(msg.sender, tokenAmount);

    //Emit an event
    emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);

    }

    function sellTokens (uint _amount) public{
    uint etherAmount = _amount/rate;

    //User can't sell more tokens
    require(token.balanceOf(msg.sender)>=_amount);

    //require sale
    require(address(this).balance>=etherAmount);

    //Perform sale
    token.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(etherAmount);

    //emit event
    emit TokensSold(msg.sender, address(token), _amount, rate);
    }

}
