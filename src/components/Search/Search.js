import React from 'react';
import classes from './Search.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FaSearch } from 'react-icons/fa';


const Search = () => {
    return (
        <div className={classes.search}>
            <input className={classes.searchInput} type="text" 
            placeholder="Enter the Company name or Stock sign">
            </input>
           <FaSearch className={classes.searchIcon}/>
        </div>
       
    )
}

export default Search;
