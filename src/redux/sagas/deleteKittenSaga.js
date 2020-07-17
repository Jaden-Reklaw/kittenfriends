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

function* deleteKittenSaga() {
    yield takeEvery('DELETE_KITTEN', deleteKittenSaga);
}

export default deleteKittenSaga;