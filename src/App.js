import React, { Component } from 'react';
import './App.css';
import Search from '././components/Search/Search';
import Header from '././components/Header/Header';
import StockDetails from '././components/StockDetails/StockDetails';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <Search></Search>
        <StockDetails showStock="main"></StockDetails>
      </React.Fragment>
    )
  }
}

export default App;
