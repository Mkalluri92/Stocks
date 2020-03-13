import React, { Component } from 'react';
import './Search.css';


class Search extends Component {
    render () {
        return (
            <input className="search" type="text" 
            placeholder="Enter the Company name or Stock sign"></input>
        )
        
    }
}

export default Search;
