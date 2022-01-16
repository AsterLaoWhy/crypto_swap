import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Navbar from './Navbar.js';

class App extends Component {
  
  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData(){
    const web3 = window.web3

    const accounts  = await web3.eth.getAccounts()
    this.setState({account:accounts[0]})

    const account_balance = await web3.eth.getBalance(this.state.account)
    this.setState({account_balance})

  }

  async loadWeb3(){
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()}
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  constructor(props){
    super(props)
    this.state = {
      account:'',
      account_balance: '0'}

  }
  render() {
    return (
      <div>
        <Navbar account = {this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="https://asterlaowhy.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={"https://c.tenor.com/MqrHbOk1VMEAAAAC/obama-money.gif"} className="App-logo" alt="logo" />
                </a>
                <h1>老外數位貨幣外匯</h1>
                
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
