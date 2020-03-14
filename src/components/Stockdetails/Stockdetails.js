import React from 'react';
import MainStock from './MainStock/MainStock';

const StockDetails = (props) => {
    return (
        <div>
            {props.showStock == "main" ? 
            <div>
            <MainStock name="PANW"/> 
            <MainStock name="EGHT"/>
            <MainStock name="GOLD"/>
            <MainStock name="AVGO"/>
            <MainStock name="SILVER"/>
            <MainStock name="TSLA"/>
            </div>: 
            <h1>hi</h1>}
        </div>
    )
}

export default StockDetails;