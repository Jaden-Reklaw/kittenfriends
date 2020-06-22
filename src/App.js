import React, { Component } from 'react';

//Import components to be used on this page
import {robots} from './robots';
import CardList from './CardList';
import SearchBox from './SearchBox';

// import bootstrap and APP.css file
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    state = {
        robots: robots,
        searchField: ''
    }

    onSearchChange = (event) => {
        console.log(event.target.value);
    }

  // Renders the entire app on the DOM
  render() {
    return (
      <div className='text-center'>
        <h1>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange}/>
        <hr />
        <CardList robots={this.state.robots}/>
      </div>
    );
  }
}

export default App;