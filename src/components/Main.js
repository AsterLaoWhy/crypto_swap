import React, { Component } from 'react'
import Buyform from "./Buyform"
import Sellform from './Sellform'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current_form: 'buy'
    }
  }

  render() {
    let content
    if(this.state.current_form=='buy'){
      content = <Buyform 
      ethBalance={this.props.ethBalance}
          tokenBalance = {this.props.tokenBalance}
          buyTokens = {this.props.buyTokens}/>
    } else{
      content =  <Sellform 
      ethBalance={this.props.ethBalance}
          tokenBalance = {this.props.tokenBalance}
          sellTokens = {this.props.sellTokens}/>
    }
    return (
      <div id="content">
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-light"
          onClick={(event)=>{
            this.setState({current_form:'buy'})
          }}>
            Buy
            </button>
            <span className = "text-muted">&lt;&nbsp;&gt;</span>
            <button className="btn btn-light"
          onClick={(event)=>{
            this.setState({current_form:'sell'})
          }}>
            Sell
            </button>
            </div>
        <div className="card mb-4" >

          <div className="card-body">
          {content}
          </div>

        </div>

      </div>
    );
  }
}

export default Main;
