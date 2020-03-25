import React, { Component } from 'react';
import classes from './Stock.module.css';
import { Sparklines, SparklinesLine } from 'react-sparklines';


class Stock extends Component {
    shouldComponentUpdate(prevProps) {
        if(prevProps.data.indicators.quote[0].open.length ===
            this.props.data.indicators.quote[0].open.length) {
                return true
            }
            return false
    }

    render() {
        let chartData = [];
            const dataLength = this.props.data.indicators.quote[0].open.length;
            const numberOfPoints = 50;
            for(let i = 0; i < numberOfPoints; i ++) {
                let price = null;
                let index = 0;
                while(price == null) {
                    const arrayIndex = (i + (++index)) * (Math.floor(dataLength / numberOfPoints));
                    if(arrayIndex > dataLength) {
                        break;
                    }
                    price = this.props.data.indicators.quote[0].open[arrayIndex];
                }
                
                if(price) {
                    chartData.push(price);
                }
            }
        let stock = null;
        let color;
        if(this.props.data !== null) {
            const differenceFromYesterday = this.props.data.meta.regularMarketPrice - 
                this.props.data.meta.chartPreviousClose;
            color = differenceFromYesterday > 0 ? "green": "red";

            stock = <React.Fragment>
                <span className={classes.value}>
                    {this.props.data.meta.regularMarketPrice}
                </span>
                <span className={differenceFromYesterday > 0 ? 
                        classes.valueHigh : classes.valueLow}>
                    {(differenceFromYesterday).toFixed(2)}
                </span>
                <span>
                    <Sparklines
                            data={chartData}>
                        <SparklinesLine color={color} />
                    </Sparklines>
                </span>
            </React.Fragment>
        }

        return (
            <React.Fragment>
                <div className={classes.mainstock}>
                    <span className={classes.name}>
                        {this.props.name}</span>
                        {stock}
                </div>
            </React.Fragment> 
        )
    }
}

export default Stock;
