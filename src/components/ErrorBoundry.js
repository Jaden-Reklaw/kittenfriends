import React, { Component } from 'react';

class ErrorBoundry extends Component {
    state = {
        hasError: false,
    }
    //New life cycle component
    componentDidCatch(error, info) {
        this.setState({hasError: true});
    }

    render() {
        return this.state.hasError ? <h2>Oops! Something went wrong!</h2> : this.props.children;
    }
}

export default ErrorBoundry;