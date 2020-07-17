import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

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

function* getKittenSaga() {
    yield takeEvery('FETCH_KITTENS', fetchKittensSaga);
}

export default getKittenSaga;