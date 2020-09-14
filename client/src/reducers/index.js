import { combineReducers } from 'redux';
import auth from './authReducer';
import misc from './miscReducer';
import user from './userReducer';
import appointment from './appointmentsReducer';
export default combineReducers({ appointment, auth, misc, user });
