import React, { Component } from 'react';

//Import components to be used on this page
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';


//Connect to the redux store
import { connect } from 'react-redux';

// import bootstrap and APP.css file
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class App extends Component {
    state = {
        kittens: [],
        searchField: ''
    }

    componentDidMount() {
      this.props.dispatch({type: 'FETCH_KITTENS'});
    }

    componentDidUpdate(prevProps) {
      if(this.props.kittens.length !== prevProps.kittens.length){
        this.setState({kittens: this.props.kittens});
      }
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
    }

  // Renders the entire app on the DOM
  render() {
    const {kittens, searchField} = this.state;
    const filteredKittens = kittens.filter((kitten) => {
      return kitten.name.toLowerCase().includes(searchField.toLowerCase())
    });
    return !kittens.length ? <h1>Loading...</h1> :
    (
      <div className='text-center'>
        <h1 className="header-title">Kitten Friends</h1>
        <SearchBox searchChange={this.onSearchChange}/>
        <Scroll>
          <ErrorBoundry>
            <CardList kittens={filteredKittens}/>
          </ErrorBoundry>
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