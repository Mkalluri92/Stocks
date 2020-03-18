import React from 'react';
import Stock from './Stock/Stock';

const Stocks = (props) => {
    return (
        <React.Fragment>
            {props.show ? 
                <React.Fragment>
                    <Stock name="PANW"/> 
                    <Stock name="EGHT"/>
                    <Stock name="GOLD"/>
                    <Stock name="AVGO"/>
                    <Stock name="SILVER"/>
                    <Stock name="TSLA"/>
                </React.Fragment> :
                    <h1>hi</h1>}
        </React.Fragment>
    )
}

export default Stocks;
