import React, { Component } from 'react';

//Import components to be used on this page
import {robots} from './robots';
import CardList from './CardList';

// import bootstrap and APP.css file
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div>
        <CardList robots={robots}/>
      </div>
    );
  }
}

export default App;