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
    stockPredict: null,
    error: false
  }


  handleChange = async (event) => {
    console.log('handlechange');
    event.persist();
    await axios({
      url: `http://localhost:8080/v1/stock_name?stock=${event.target.value}`,
      method: 'get'
    }).then(response => {
      console.log(response.data.quotes.length);
      console.log(event.target.value);
      if(response.data.quotes.length>0) {
        this.setState({
        stockPredict: response.data.quotes,
        error: false
      }) 
    } else {
      this.setState({
        stockPredict: null,
        error: true,
      })
    }
    }).catch(error => {
      console.log('error getting');
      if(event.target.value === ''){
        this.setState({
          stockPredict: null,
          showStockDetails: false,
          error: true,
        })
      } else {
        this.setState({
          stockPredict: null,
          error: true,
        })
      }
    })
  }


  enterStockName = (event) => {
    console.log('enterStockname');
    console.log('stockName:' + event.target.value)
      if((event.keyCode === 13 )) {
         console.log('chaging');
        this.setState({
          showStockDetails: true,
          stockName: event.target.value,
          showPredictions: false
        })
      } else {
        this.setState({
          showPredictions: true,
          showDetails: false
        })
      }
  }

  getStockName = (event) => {
    console.log('getstockname');
    console.log(event.currentTarget);
    this.setState({
      stockName: event.currentTarget.children[0].innerHTML,
      showStockDetails: true,
      showPredictions: false
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
          showPredictions = {this.state.showPredictions}
          error = {this.state.error}/>
      
        {(this.state.showStockDetails)? null : 
            (this.state.stocks.map((current) => {
                  return <Stocks key={current} 
                  name={current} 
                  showDetails= {this.state.showStockDetails}
                  showError = {this.state.error}/> 
              }))}
        
        {(this.state.showStockDetails)? 
              <Stocks name={this.state.stockName}
          showDetails={this.state.showStockDetails}
          showError = {this.state.error}> </Stocks> :
         null}
         {this.state.showStockDetails? null: <StockNews />}
      </ErrorBoundary>
     
    )
  }
}

export default App;
