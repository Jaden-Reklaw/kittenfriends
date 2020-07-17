import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//Saga for removing a kitten from the database
function* removeKittenSaga ( action ){
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

function* deleteKittenSaga() {
    yield takeLatest('DELETE_KITTEN', removeKittenSaga);
}

export default deleteKittenSaga;