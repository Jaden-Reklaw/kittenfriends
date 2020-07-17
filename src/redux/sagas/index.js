import { all } from 'redux-saga/effects';

//Add saga modules to all array to be used on index.js for rootSaga
import getKittenSaga from './getKittenSaga';
import postKittenSaga from './postKittenSaga';
import deleteKittenSaga from './deleteKittenSaga';

export default function* rootSaga() {
  yield all([
    getKittenSaga(),
    postKittenSaga(),
    deleteKittenSaga(),
  ]);
}