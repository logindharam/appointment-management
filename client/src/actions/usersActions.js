import axios from 'axios';
import setAuthToken from './../util/setAuthToken';

import { USER_LIST, USER_DETAIL } from './types';

import { setLoading } from './miscActions';
import { toastSuccessMessage, toastErrorMessage } from './../util';

export const getUsers = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/users');
        dispatch(setLoading(false));
        dispatch({
            type: USER_LIST,
            payload: res.data.user,
        });
    } catch (error) {
        dispatch(setLoading(false));
        toastErrorMessage(error.response.data.msg);
    }
};

export const addUser = (user) => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.post('/api/users', user);
        dispatch(setLoading(false));
        dispatch(getUsers());
        toastSuccessMessage('User added successfully')
    } catch (error) {
        dispatch(setLoading(false));

        error.response.data.errors.map((err) => {
            toastErrorMessage(err.msg);
        });
    }
};

export const getUser = (id) => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/users/' + id);
        dispatch(setLoading(false));
        dispatch({
            type: USER_DETAIL,
            payload: res.data.user,
        });
    } catch (error) {
        dispatch(setLoading(false));
    }
};
export const updateUser = (user) => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.put('/api/users/' + user._id, user);
        dispatch(setLoading(false));
        toastSuccessMessage('User updated successfully')
    } catch (error) {
        dispatch(setLoading(false));
    }
};
export const deleteUser = (id) => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.delete('/api/users/' + id);
        dispatch(setLoading(false));
        dispatch(getUsers());
        toastSuccessMessage('User deleted successfully')
    } catch (error) {
        dispatch(setLoading(false));
    }
};
