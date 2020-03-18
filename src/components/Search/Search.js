import React from 'react';
import classes from './Search.module.css';
import { FaSearch } from 'react-icons/fa';


const Search = () => {
    return (
        <div className={classes.search}>
            <input className={classes.searchInput} type="text" 
            placeholder="Enter the Company name or Stock symbol">
            </input>
           <FaSearch className={classes.searchIcon}/>
        </div>
       
    )
}

export default Search;
