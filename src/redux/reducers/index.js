import { combineReducers } from 'redux';
import kittens from './kittensReducer';

const rootReducer = combineReducers({
  kittens,
});

export default rootReducer;