import React, { Component } from 'react';
import Stock from './Stock/Stock';
import axios from 'axios';
import StockDetails from './../StockDetails/StockDeatils';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';


class Stocks extends Component {
    
    state = {
        data: null,
        interval: '2m',
        range: '1d',
        error: false
    }
    
    getStocks = async () => {
        //console.log(this.props);
        //console.log(this.state);
        if(this.state.error){
            return null
        }
        else {
            await axios({
                url: `http://localhost:8080/v1/stock_details?stock=${this.props.name}&interval=${this.state.interval}&range=${this.state.range}`,
                method: 'get'
            }).then(response => {
                this.setState({
                    data : response.data.chart.result[0],
                });
            }).catch(error => {
                this.setState({
                    error: true,
                    errorMessage: `Error getting stock details for ${this.props.name}`
                })
            })
        }
    };

    handleValidRange= (event) => {
        let rangeSelected = event.target.innerHTML;
        let rangeInterval = {
            '1 day' :   { interval: '2m',
                            range: '1d' },
            '5 days':   { interval: '15m',
                            range: '5d' },
            '1 month': { interval: '1h',
                            range: '1mo' },
            '6 months': { interval: '1d',
                            range: '6mo' },
            'YTD':      { interval: '1d',
                            range: 'ytd' },
            '1 year':   { interval: '1wk',
                            range: '1y' },
            '5 years':  { interval: '1mo',
                            range: '5y' },
            'Max':      { interval: '1mo',
                            range: 'max' }
        }
        this.setState({
            interval: rangeInterval[rangeSelected].interval,
            range: rangeInterval[rangeSelected].range
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.data !== null){
            if (nextProps.name.toUpperCase() !== prevState.data.meta.symbol) {
                return {
                    data: null,
                    interval: '2m',
                    range: '1d'
                };
            }
            return null;
        }
        return null;
    }

    componentDidMount() {
        this.getStocks();
        setInterval(() => {
            var date = new Date();
            if((date.getHours() > 7 && date.getMinutes() > 0) && 
                    (date.getHours() < 13 && date.getMinutes() > 0)){
                this.getStocks();
            }
        }, 10000);
    }

    componentDidUpdate(prevProps, prevState){
        if((prevProps.name !== this.props.name) || 
            (prevState.range !== this.state.range)){
            this.getStocks();
            //console.log('didupdate');
        }
    }
   
   
    render() {
        return(
            (this.state.error)? <p>{this.state.errorMessage}</p>:
            <ErrorBoundary>
                {((this.state.data !== null) && !(this.props.showDetails))?
                        <Stock 
                            data={this.state.data}
                            name={this.props.name}>
                        </Stock> : null
                }
                {(this.props.showDetails) ?
                        <StockDetails data={this.state}
                            handleRange ={this.handleValidRange}>
                        </StockDetails>: null 
                }
        </ErrorBoundary>
    )}
}

export default Stocks; 
