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

//Import the Root Reducer to had redux to index.js
import rootReducer from './redux/reducers/index'


//Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('ADD_KITTEN', addKittensSaga);
    yield takeEvery('DELETE_KITTEN', deleteKittenSaga);
    yield takeEvery('UPDATE_KITTEN_INFO', updateKittenSaga);
}

//Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

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
function* deleteKittenSaga ( action ){
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

//Saga for updating a kitten's info on the database
function* updateKittenSaga ( action ){
    console.log('updateKittenSaga id is', action.payload);
    try {
        //Making async AJAX (axios) request
        yield axios.put(`/api/kittens/update/${action.payload.id}`, action.payload.newData);
        //Redo the get saga to see changes after delete
        yield put({type: 'FETCH_KITTENS'});
    } catch(error) {
        console.log('error with kittens update request', error);
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        rootReducer,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
