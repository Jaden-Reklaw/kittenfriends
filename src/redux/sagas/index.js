import { all } from 'redux-saga/effects';
import getKittenSaga from './getKittenSaga';
import postKittenSaga from './postKittenSaga';

export default function* rootSaga() {
  yield all([
    getKittenSaga(),
    postKittenSaga(),
  ]);
}