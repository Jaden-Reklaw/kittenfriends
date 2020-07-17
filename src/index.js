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
import rootReducer from './redux/reducers/index';

//Import the Root Saga
import rootSaga from './redux/sagas/index';


//Create the rootSaga generator function
function* rootSaga() {
    
    
    yield takeEvery('UPDATE_KITTEN_INFO', updateKittenSaga);
}

//Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();



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
