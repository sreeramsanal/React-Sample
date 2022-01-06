import homeReducer from './reducers/home';
import { combineReducers } from 'redux';

export default combineReducers({
  home: homeReducer,
});
