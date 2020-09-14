import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERROR,
    LOAD_USER,
} from './types';
import axios from 'axios';
import setAuthToken from './../util/setAuthToken';
import { setLoading } from './miscActions';
import { toastSuccessMessage, toastErrorMessage } from './../util';
export const authLogin = (user) => async (dispatch) => {
    try {
        const res = await axios.post('/api/auth', user);
        dispatch(setLoading(false));
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(getAuthUser());
        toastSuccessMessage('Login Successfully')
    } catch (error) {
        dispatch(setLoading(false));
        toastErrorMessage(error.response.data.msg);
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.msg,
        });
    }
};

export const getAuthUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch(setLoading(false));
        dispatch({
            type: LOAD_USER,
            payload: res.data,
        });
    } catch (error) {
        dispatch(setLoading(false));
        toastErrorMessage(error.response.data.msg);
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.msg,
        });
    }
};

export const getLogout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
};
export const clearError = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR,
    });
};
