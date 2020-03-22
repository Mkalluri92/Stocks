import React, { Component } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Header from './components/Header/Header';
import Stocks from './components/Stocks/Stocks';
import StockNews from './components/StockNews/StockNews';

class App extends Component {
  constructor(props){
    super(props);
  }
  state = {
    stocks: ["PANW", "EGHT", "CSCO", "AVGO", "W", "TSLA", 
              "UVXY", "WDAY", "AAPL", "GOOGL", "AMD", "MSFT"],
    stockName: null,
    showStockDetails: false
  }

  enterStockName = (event) => {
    //debugger;
    if(event.keyCode === 13) {
      console.log(event.target.value);
      this.setState({
        stockName: event.target.value,
        showStockDetails: true
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextState.showStockDetails) {
      return true
    }
    return false;
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <Header />
        <Search change={this.enterStockName} handleChange={this.enterStockName}/>
        {this.state.showStockDetails? null :this.state.stocks.map((current) => {
                  return <Stocks key={current} 
                  name={current} 
                  showDetails= {this.state.showStockDetails}/> 
              })}
        
        {(this.state.showStockDetails)? 
          <Stocks name={this.state.stockName}
          showDetails={this.state.showStockDetails}> </Stocks>:
         null}
         {this.state.showStockDetails? null: <StockNews />}
      </React.Fragment>
     
    )
  }
}

export default App;
