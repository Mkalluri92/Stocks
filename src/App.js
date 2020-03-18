import React, { Component } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Header from './components/Header/Header';
import Stocks from './components/Stocks/Stocks';
import StockNews from './components/StockNews/StockNews';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Search />
        <Stocks show = {true} />
        <StockNews />
      </React.Fragment>
    )
  }
}

export default App;
