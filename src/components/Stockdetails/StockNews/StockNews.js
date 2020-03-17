import React from 'react';

const StockNews = () => {
    var url = 'http://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2020-03-17&' +
          'sortBy=popularity&' +
          'apiKey=API_KEY';

    var req = new Request(url);

    fetch(req)
        .then(function(response) {
            console.log(response.json());
        })
}

export default StockNews;
