import React, { Component } from 'react';

//Import components to be used on this page
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';

//Connect to the redux store
import { connect } from 'react-redux';

// import bootstrap and APP.css file
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class App extends Component {
    state = {
        robots: [],
        searchField: ''
    }

    componentDidMount() {
      this.props.dispatch({type: 'FETCH_KITTENS'});
    }

    componentDidUpdate(prevProps) {
      if(this.props.kittens.length !== prevProps.kittens.length){
        this.setState({robots: this.props.kittens});
      }
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
    }

  // Renders the entire app on the DOM
  render() {
    const filteredRobots = this.state.robots.filter((robot) => {
      return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
    });
    console.log('kittens is', this.state.kittens);
    return (
      <div className='text-center'>
        <h1 className="header-title">Kitten Friends</h1>
        <SearchBox searchChange={this.onSearchChange}/>
        <Scroll>
          <CardList robots={filteredRobots}/>
        </Scroll>
      </div>
    );
  }
}

//Get redux store
const mapStateToProps = reduxState => ({
  kittens: reduxState.kittens
});

export default connect(mapStateToProps)(App);