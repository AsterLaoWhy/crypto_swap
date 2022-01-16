const Token = artifacts.require("Token");
const CryptoSwap = artifacts.require("CryptoSwap");

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n){
  return web3.utils.toWei(n, 'ether')
}

contract('CryptoSwap', ([deployer, investor])=>
{
  let token, cryptoSwap
  before(async()=>{
    token = await Token.new()
    cryptoSwap = await CryptoSwap.new(token.address)
    //Transfer everything to CryptoSwap(a milli)
    await token.transfer(cryptoSwap.address, tokens('1000000'))
  })
  describe('Token deployment', async()=>{
    it('contract has a name', async() =>{
      const name = await token.name()
      assert.equal(name, 'Jon Token')
    })
  })
  describe('CryptoSwap deployment', async()=>{
    it('contract has a name', async() =>{
      const name = await cryptoSwap.name()
      assert.equal(name, 'CryptoSwap Instant Exchange')
    })

    it('contract has tokens', async ()=>{
      let balance = await token.balanceOf(cryptoSwap.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })
  describe('buyTokens()', async()=>{
      let result
      before(async()=>{
        result=await cryptoSwap.buyTokens({from:investor, value:web3.utils.toWei('1', 'ether')})
    
  })
    it('Allows user to buy tokens from CryptoSwap for a price', async()=>{
      //check if investor balance changed
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('100'))

      let cryptoSwapBalance
      cryptoSwapBalance = await token.balanceOf(cryptoSwap.address)
      assert.equal(cryptoSwapBalance.toString(), tokens("999900"))
      cryptoSwapBalance = await web3.eth.getBalance(cryptoSwap.address)
      assert.equal(cryptoSwapBalance.toString(), web3.utils.toWei('1', 'Ether'))
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')
    })
  })
  describe('sellTokens()', async()=>{
      let result
      before(async()=>{
        await token.approve(cryptoSwap.address, tokens('100'), {from:investor})
        result = await cryptoSwap.sellTokens(tokens('100'), {from:investor})
    
  })
    it('Allows user to sell tokens to CryptoSwap for a price', async()=>{
      //check if investor balance changed
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('0'))

      //check cryptoSwap
      let cryptoSwapBalance
      cryptoSwapBalance = await token.balanceOf(cryptoSwap.address)
      assert.equal(cryptoSwapBalance.toString(), tokens("1000000"))
      cryptoSwapBalance = await web3.eth.getBalance(cryptoSwap.address)
      assert.equal(cryptoSwapBalance.toString(), web3.utils.toWei('0', 'Ether'))
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')

      //failue:too many for investor
      await cryptoSwap.sellTokens(tokens('500'), {from:investor}).should.be.rejected;
    })
  })
})
