import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://asterlaowhy.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            老外數位貨幣外匯
          </a>
          <ul className = "navbar-nav px-3">
            list
        </nav>
    );
    //style = "color:rgb(0,255,255)
  }
}

export default Navbar;
