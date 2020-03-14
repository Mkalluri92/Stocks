import React, { Component } from 'react';
import classes from './Search.module.css';


class Search extends Component {
    render () {
        return (
            <input className={classes.search} type="text" 
            placeholder="Enter the Company name or Stock sign"></input>
        )
        
    }
}

export default Search;
