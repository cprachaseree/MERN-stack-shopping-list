import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

export default combineReducers({
  item: itemReducer
  // include all other reducers
  // eg. if have authentication then auth: authReducer should be added
});