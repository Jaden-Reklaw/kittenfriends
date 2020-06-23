import React, { Component } from 'react';

//Import components to be used on this page
import {robots} from './robots';
import CardList from './CardList';
import SearchBox from './SearchBox';

// import bootstrap and APP.css file
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class App extends Component {
    state = {
        robots: robots,
        searchField: ''
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
    }

  // Renders the entire app on the DOM
  render() {
    const filteredRobots = this.state.robots.filter((robot) => {
      return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
    });
    return (
      <div className='text-center'>
        <h1 className="header-title">Kitten Friends</h1>
        <SearchBox searchChange={this.onSearchChange}/>
        <hr />
        <CardList robots={filteredRobots}/>
      </div>
    );
  }
}

export default App;