import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import CryptoSwap from '../abis/CryptoSwap.json'
import Token from '../abis/Token.json'
import Navbar from './Navbar';
import Main from './Main';

class App extends Component {

   async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance })
    
    //load token
    const networkId = await web3.eth.net.getId()
    const tokenData = Token.networks[networkId]
    if (tokenData){
        const token = new web3.eth.Contract(Token.abi, tokenData.address)
        this.setState({ token })
        let tokenBalance = await token.methods.balanceOf(this.state.account).call()
        this.setState({tokenBalance:tokenBalance.toString()})
    }else{
      window.alert('Please switch to appropriate network.')
    }
    
   //load exchange
    const swapData = CryptoSwap.networks[networkId]
    if (swapData){
        const cryptoSwap = new web3.eth.Contract(CryptoSwap.abi, swapData.address)
        this.setState({ cryptoSwap })
    }else{
      window.alert('Please switch to appropriate network.')
    }
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    this.setState({loading:false})
  }

  buyTokens = (ethAmount) => {
    this.setState({loading:true})
    this.state.cryptoSwap.methods.buyTokens().send({ value: ethAmount, from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  sellTokens = (tokenAmount) =>{
    this.setState({loading:true})
    this.state.token.methods.approve(this.state.cryptoSwap.address, tokenAmount).send({from: this.state.account }).on('transactionHash', (hash) => {
      this.state.cryptoSwap.methods.sellTokens(tokenAmount).send({from: this.state.account }).on('transactionHash', (hash) =>{
      this.setState({ loading: false })
        })
      })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      token:{},
      cryptoSwap:{},
      ethBalance: '0',
      tokenBalance:'0',
      loading : true
    }
  }

  render() {
    let content
    if(this.state.loading){
      content = <p id="loader" className="text-center">Loading...</p>
    } else{
      content = <Main 
      ethBalance = {this.state.ethBalance} 
      tokenBalance = {this.state.tokenBalance}
      buyTokens = {this.buyTokens} 
      sellTokens = {this.sellTokens}
      />
    }
    return (
      <div>
        <Navbar account = {this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto"style = {{maxWidth:'600px'}}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://asterlaowhy.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  
                </a>
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
