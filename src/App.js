import React, { Component } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Header from './components/Header/Header';
import Stocks from './components/Stocks/Stocks';
import StockNews from './components/StockNews/StockNews';
import axios from 'axios';

class App extends Component {
  
  state = {
    stocks: ["PANW", "EGHT", "CSCO", "AVGO", "W", "TSLA", 
              "UVXY", "WDAY", "AAPL", "GOOGL", "AMD", "MSFT"],
    stockName: null,
    showStockDetails: false,
    stockPredict: null
  }


  handleChange = async (event) => {
    event.persist();
    await axios({
      url: `http://localhost:8080/v1/stock_name?stock=${event.target.value}`,
      method: 'get'
    }).then(response => {
      this.setState({
        stockPredict: response.data.quotes,
        stockName: event.target.value
      })
    }).catch(error => {
        console.error(error.message);
    })
  }


  enterStockName = (event) => {
    if(event.keyCode === 13) {
      this.setState({
        showStockDetails: true
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if((nextState.showStockDetails) || (nextState.stockPredict !== null)) {
      return true
    }
    return false;
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <Header />
        <Search enterStockName={this.enterStockName} 
          handleChange={this.handleChange}
          predictName={this.state.stockPredict}/>
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
