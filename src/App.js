import React, { Component } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Header from './components/Header/Header';
import Stocks from './components/Stocks/Stocks';
import StockNews from './components/StockNews/StockNews';
import axios from 'axios';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

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
      console.log(response);
      this.setState({
        stockPredict: response.data.quotes,
        stockName: event.target.value
      })
    }).catch(error => {
      console.log(error);
      this.setState({
        stockPredict: null
      })
    })
  }


  enterStockName = (event) => {
    if(event.keyCode === 13) {
      this.setState({
        showStockDetails: true,
        stockName: event.target.value
      })
    } else {
      this.setState({
        showStockDetails: false
      })
    }
  }

  getStockName = (event) => {
    console.log(event.currentTarget);
    this.setState({
      stockName: event.currentTarget.children[0].innerHTML,
      showStockDetails: true,
    })
  }


  render() {
    console.log(this.state);
    return (
      <ErrorBoundary>
        <Header />
        <Search enterStockName={this.enterStockName} 
          handleChange={this.handleChange}
          predictName={this.state.stockPredict}
          click= {this.getStockName}
          showPredictions = {!(this.state.showStockDetails)}/>
      
        {this.state.showStockDetails? null :this.state.stocks.map((current) => {
                  return <Stocks key={current} 
                  name={current} 
                  showDetails= {this.state.showStockDetails}/> 
              })}
        
        {(this.state.showStockDetails)? 
              <Stocks name={this.state.stockName}
          showDetails={this.state.showStockDetails}> </Stocks> :
         null}
         {this.state.showStockDetails? null: <StockNews />}
      </ErrorBoundary>
     
    )
  }
}

export default App;
