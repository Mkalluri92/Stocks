import React from 'react';
import logo from '././stock_logo.png';
import classes from './Header.module.css';

const Header = () => {
    return (
        <div className={classes.header}>
            <img className={classes.logo} src={logo}></img>
            <h1>Stock Portfolio</h1>
        </div>
    )
}

export default Header;
