import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import contactReducer from './contactReducer'

export default combineReducers({
    errors: errorReducer,
    contacts: contactReducer
});