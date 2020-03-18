import React from 'react';
import classes from './Stock.module.css';
import { Sparklines, SparklinesLine } from 'react-sparklines';

//TODO: need to remove in future
const data = () => {
  return {
    'present': (Math.random()*1000).toFixed(3),
    'yesterday': (Math.random()*1000).toFixed(3),
    '2019': (Math.random()*1000).toFixed(3),
    '2018': (Math.random()*1000).toFixed(3),
    '2017': (Math.random()*1000).toFixed(3),
    '2016': (Math.random()*1000).toFixed(3),
    '2015': (Math.random()*1000).toFixed(3),
    '2014': (Math.random()*1000).toFixed(3),
    '2013': (Math.random()*1000).toFixed(3),
    '2012': (Math.random()*1000).toFixed(3),
    '2011': (Math.random()*1000).toFixed(3),
    '2010': (Math.random()*1000).toFixed(3)
  };
}

const Stock = (props) => {
    const values = data();
    var profitOrLoss;
    var graphDetails = [values.present, values.yesterday, values[2019], values[2018],
                        values[2017],values[2016], values[2015], values[2014],
                         values[2013], values[2012], values[2011], values[2010]];
    
    const color = (values.present - values.yesterday).toFixed(2) > 0 ? "green" : "red";
    
    profitOrLoss = (
        <React.Fragment>
            <span className={color === "green" ? 
                classes.valueHigh : classes.valueLow}>
                {'+'+(values.present - values.yesterday).toFixed(2)}
            </span>
            <Sparklines data={graphDetails} >
                    <SparklinesLine color={color} />
            </Sparklines>
        </React.Fragment>
    )       
    
    return (
        <div className={classes.mainstock}>
            <span className={classes.name}>
                {props.name}</span>
            <span className={classes.value}>
                {values.present}
            </span>
            {profitOrLoss}
        </div>
    )
}

export default Stock;
