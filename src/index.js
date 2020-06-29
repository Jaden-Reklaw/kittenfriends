import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';

//Used to create redux state and a store
import { createStore, combineReducers, applyMiddleware } from 'redux';

//Provider allows us to use redux within our react app
import { Provider } from 'react-redux';

//Used to for logging state in redux when it changes
import logger from 'redux-logger';

//Import saga middleware
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';

//Bring in Axios into the project
import axios from 'axios';


//Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_KITTENS', fetchKittensSaga);
    yield takeEvery('ADD_KITTEN', addKittensSaga);
    yield takeEvery('DELETE_KITTEN', deleteKittensSaga);
}

//Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

//Used to store movies returned from the server
const kittens = (state = [], action) => {
    switch (action.type) {
        case 'SET_KITTENS':
            return action.payload;
        default:
            return state;
    }
}

//Create Generator Funcitons for sagas
//Generator function that uses saga to ajax get request
function* fetchKittensSaga ( action ){
    try {
        //Making async AJAX (axios) request
        const response = yield axios.get('/api/kittens/get');
        //Once that is back successfully, dispatch action to the reducer
        yield put({ type: 'SET_KITTENS', payload: response.data});
    } catch(error) {
        console.log('error with kittens get request', error);
    }
}

//Saga for adding a kitten to the database
function* addKittensSaga ( action ){
    console.log('addKittenSaga', action.payload.newKitten);
    try {
        //Making async AJAX (axios) request
        yield axios.post(`/api/kittens/add`, action.payload.newKitten);
        //Redo the get saga to see changes after post
        yield put({type: 'FETCH_KITTENS'});
    } catch(error) {
        console.log('error with kittens delete request', error);
    }
}

//Saga for removing a kitten from the database
function* deleteKittensSaga ( action ){
    console.log('deleteKittenSaga id is', action.payload.id);
    try {
        //Making async AJAX (axios) request
        yield axios.delete(`/api/kittens/delete/${action.payload.id}`);
        //Redo the get saga to see changes after delete
        yield put({type: 'FETCH_KITTENS'});
    } catch(error) {
        console.log('error with kittens delete request', error);
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        kittens,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
