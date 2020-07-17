import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//Saga for updating a kitten's info on the database
function* updateKittenSaga ( action ){
    console.log('updateKittenSaga id is', action.payload);
    try {
        //Making async AJAX (axios) request
        yield axios.put(`/api/kittens/update/${action.payload.id}`, action.payload.newData);
        //Redo the get saga to see changes after update
        yield put({type: 'FETCH_KITTENS'});
    } catch(error) {
        console.log('error with kittens update request', error);
    }
}

function* putKittenSaga() {
    yield takeLatest('UPDATE_KITTEN_INFO', updateKittenSaga);
}

export default putKittenSaga;