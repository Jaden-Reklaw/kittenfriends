import { all } from 'redux-saga/effects';
import getKittenSaga from './getKittenSaga';

export default function* rootSaga() {
  yield all([
    getKittenSaga(),
    
  ]);
}