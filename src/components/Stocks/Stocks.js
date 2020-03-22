import React, { Component } from 'react';
import Stock from './Stock/Stock';
import axios from 'axios';
import StockDetails from './../StockDetails/StockDeatils';

class Stocks extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        data: null
    }
    
    getStocks = async () => {
        await axios({
            url: `http://localhost:8080/v1/stock_details?stock=${this.props.name}`,
            method: 'get'
        }).then(response => {
            this.setState({
                data : response,
            });
        }).catch(error => {
            console.error(error.message);
        })
    };

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

    componentDidUpdate(prevProps){
        if(prevProps.name !== this.props.name){
            this.getStocks();
        }
    }
   
   
    render() {
        console.log(this.state.data);
        return(
            <React.Fragment>
                {((this.state.data !== null) && !(this.props.showDetails))? 
                    <Stock 
                        data={this.state.data}
                        name={this.props.name}>
                    </Stock>: null
                }
                {(this.props.showDetails) ?
                    <StockDetails data={this.state.data}></StockDetails>: null 
                }
        </React.Fragment>
    )}
}

export default Stocks; 
