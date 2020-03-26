import React, { Component } from 'react';
import News from './News/News';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

class StockNews extends Component {
    state= {
        news: 0
      }
    
    newsHeadlines = () => {
        const url = 'http://newsapi.org/v2/top-headlines?' +
          'sources=cnbc,bloomberg,business-insider,the-wall-street-journal&' +
          'language=en&' +
          'apiKey=bc9c3df5bbaa4f188c8e6b51f86fce89';
        const req = new Request(url);
        fetch(req)
            .then((response) => {
                return(response.json());
            }).then((response) => {
                this.setState({
                  news : response.articles
                })
            })
        }
  
    componentDidMount() {
          this.newsHeadlines();
    }
    render () {
        var news;
        if(this.state.news === 0) {
            news = null;
        } else {
            news = this.state.news.map((current,index) => (
                <News key={index} {...current}/>
            ))
        }

    return (
        <ErrorBoundary>
           {news}
        </ErrorBoundary>
    )
    }
}

export default StockNews;
