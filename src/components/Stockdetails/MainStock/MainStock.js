import React from 'react';
import classes from './MainStock.module.css';


const MainStock = (props) => {
    return (
            <span className={classes.mainstock}>{props.name}</span>
    )
}

export default MainStock