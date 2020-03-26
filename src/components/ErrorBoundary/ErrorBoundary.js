import React, { Component } from 'react';

class ErrorBoundary extends Component {
  debugger;
    constructor(props) {
     super(props);
     this.state = {
      errorFound: false,
      errorMessage: null
     };
    }
   componentDidCatch(error, info) {
     this.setState({
      errorFound: true,
      errorMessage: error.message
     });
     console.log('error: ', error);
     console.log('info: ', info);
    }

   render() {
     if (this.state.errorFound) {
      return <p>{this.state.errorMessage}</p>;
     }
   return this.props.children;
    }
}

export default ErrorBoundary;