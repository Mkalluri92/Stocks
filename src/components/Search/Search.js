import React from 'react';
import classes from './Search.module.css';
import { FaSearch } from 'react-icons/fa';


const Search = (props) => {

    return (
        <div className={classes.search}>
            <input type="text"
                className={classes.searchInput}
                placeholder="Enter the Company name or Stock symbol"
                onChange= {props.handleChange}
                onKeyDown={props.change}>
            </input>
           <FaSearch className={classes.searchIcon}/>
        </div>
    
    )
}

export default Search;
