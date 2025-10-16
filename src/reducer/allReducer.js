import {combineReducers} from 'redux';
import authReducer from './reducer';
const allReducers = combineReducers({
    authReducer,
});
export default allReducers;