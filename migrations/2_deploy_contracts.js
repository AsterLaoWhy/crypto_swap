const Token = artifacts.require("Token");
const CryptoSwap = artifacts.require("CryptoSwap");


module.exports = async function(deployer) {
  //Deploy Token
  await deployer.deploy(Token);
  const token  = await Token.deployed()
  //Deploy Swap
  await deployer.deploy(CryptoSwap, token.address);
  const cryptoSwap = await CryptoSwap.deployed()

  //Transfer everything to CryptoSwap(a milli)
  await token.transfer(cryptoSwap.address, '1000000000000000000000000')
};
