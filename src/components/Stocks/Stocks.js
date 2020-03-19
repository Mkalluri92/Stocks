import React from 'react';
import Stock from './Stock/Stock';

const Stocks = (props) => {
    const stocks = ["PANW", "EGHT", "GC=F", "AVGO", "W", "TSLA", 
                    "UVXY", "WDAY", "AAPL", "GOOGL", "AMD", "MSFT"];
    return (
        <React.Fragment>
            {props.show ? 
                <React.Fragment>
                    {stocks.map((current) => {
                        return <Stock key={current} name={current}/> 
                    })}
                </React.Fragment> :
                    <h1>hi</h1>}
        </React.Fragment>
    )
}

export default Stocks;
