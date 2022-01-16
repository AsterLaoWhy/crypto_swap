const Token = artifacts.require("Token");
const CryptoSwap = artifacts.require("CryptoSwap");

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n){
  return web3.utils.toWei(n, 'ether')
}

contract('CryptoSwap', (accounts)=>
{
  let token, cryptoSwap
  before(async()=>{
    token = await Token.new()
    cryptoSwap = await CryptoSwap.new()
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

})
