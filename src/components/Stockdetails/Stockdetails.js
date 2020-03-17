import React from 'react';
import MainStock from './MainStock/MainStock';

const StockDetails = (props) => {
    return (
        <React.Fragment>
            {props.showStock == "main" ? 
            <React.Fragment>
                <MainStock name="PANW"/> 
                <MainStock name="EGHT"/>
                <MainStock name="GOLD"/>
                <MainStock name="AVGO"/>
                <MainStock name="SILVER"/>
                <MainStock name="TSLA"/>
            </React.Fragment> :
            <h1>hi</h1>}
        </React.Fragment>
    )
}

export default StockDetails;
