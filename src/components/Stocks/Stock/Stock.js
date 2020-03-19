import React, { Component } from 'react';
import classes from './Stock.module.css';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import axios from 'axios';

class Stock extends Component {
    constructor(props){
        super(props);
    }

    state = {
        data: null,
        chartData: null
    }

    getStocks = async () => {
        await axios({
            url: `http://localhost:8080/v1/stock_details?stock=${this.props.name}`,
            method: 'get'
        }).then(response => {
            let chartData = [];

            const dataLength = response.data.chart.result[0].indicators.quote[0].open.length;
            const numberOfPoints = 50;
            for(let i = 0; i < numberOfPoints; i ++) {
                let price = null;
                let index = 0;
                while(price == null) {
                    const arrayIndex = (i + (++index)) * (Math.floor(dataLength / numberOfPoints));
                    if(arrayIndex > dataLength) {
                        break;
                    }
                    console.log(this.props.name + "--->" + arrayIndex);
                    price = response.data.chart.result[0].indicators.quote[0]
                        .open[arrayIndex];
                }
                
                if(price) {
                    chartData.push(price);
                }
            }

            this.setState({
                data : response,
                chartData
            })
            //console.log(response);
            console.log(this.state.data.data.chart.result[0].indicators.quote[0].open);
        }).catch(error => {
            console.error(error.message);
        })
    };

    componentDidMount() {
        this.getStocks();
    }

    render() {
        let stock = null;
        let color;
        if(this.state.data !== null) {
            const differenceFromYesterday = this.state.data.data.chart.result[0].meta.regularMarketPrice - 
                this.state.data.data.chart.result[0].meta.chartPreviousClose;
            color = differenceFromYesterday > 0 ? "green": "red";

            stock = <React.Fragment>
                <span className={classes.value}>
                    {this.state.data.data.chart.result[0].meta.regularMarketPrice}
                </span>
                <span className={differenceFromYesterday > 0 ? 
                        classes.valueHigh : classes.valueLow}>
                    {+(differenceFromYesterday).toFixed(4)}
                </span>
                <span>
                    <Sparklines
                            data={this.state.chartData}>
                        <SparklinesLine color={color} />
                    </Sparklines>
                </span>
            </React.Fragment>
        }

        return (
            <div className={classes.mainstock}>
                <span className={classes.name}>
                    {this.props.name}</span>
                    {stock}
            </div>
        )
    }
}

export default Stock;
