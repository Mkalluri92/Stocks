import React, { Component } from 'react';
import classes from './Search.module.css';
import { FaSearch } from 'react-icons/fa';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';


class Search extends Component {
    
    render() {
        console.log(this.props);
        return (
            <ErrorBoundary>
                <div className={classes.search}>
                    <input type="text"
                        className={classes.searchInput}
                        placeholder="Enter the Company name or Stock symbol"
                        onChange= {this.props.handleChange}
                        onKeyDown={this.props.enterStockName}>
                    </input>
                    <FaSearch className={classes.searchIcon}/>
                </div>
                {((this.props.predictName !== null) && (this.props.showPredictions) &&(this.props.predictName.length>0))? 
                    <div className={classes.prediction}>
                        {this.props.predictName.map((current, index) => {
                            return <div key={index} 
                            className={this.props.showPredictions? classes.predictName:
                            classes.showNothing}
                            onClick={this.props.click}>
                                <b className={classes.symbol}>{current.symbol}</b>  
                                <span>{current.shortname}</span>
                            </div>
                        })}
                    </div> : null
                }
                
            </ErrorBoundary>
        )
    }
}

export default Search;


//https://query2.finance.yahoo.com/v1/finance/search?q=w&lang=en-US&region=US&quotesCount=6&newsCount=4&enableFuzzyQuery=false&quotesQueryId=tss_match_phrase_query&multiQuoteQueryId=multi_quote_single_token_query&newsQueryId=news_cie_vespa&enableCb=true&enableNavLinks=true&enableEnhancedTrivialQuery=true
