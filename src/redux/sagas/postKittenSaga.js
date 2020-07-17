//Saga for adding a kitten to the database
function* addKittenSaga ( action ){
    console.log('addKittensSaga', action.payload.newKitten);
    try {
        //Making async AJAX (axios) request
        yield axios.post(`/api/kittens/add`, action.payload.newKitten);
        //Redo the get saga to see changes after post
        yield put({type: 'FETCH_KITTENS'});
    } catch(error) {
        console.log('error with kittens delete request', error);
    }
}

function* postKittenSaga() {
    yield takeEvery('ADD_KITTEN', addKittenSaga);
}

export default postKittenSaga;
