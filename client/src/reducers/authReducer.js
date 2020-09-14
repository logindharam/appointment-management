import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOAD_USER,
    CLEAR_ERROR,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    auth: null,
    error: null,
    isAuth: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: localStorage.token,
                error: null,
                isAuth: true,
            };
        case LOAD_USER:
            return {
                ...state,
                isAuth: true,
                error: null,
                auth: action.payload,
            };
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuth: false,
                token: null,
                error: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        case LOGOUT:
            console.log('kjehjk')
            localStorage.removeItem('token');
            return {
                ...state,
                error: null,
                isAuth: false,
                token: null,
                auth: null,
            };
        default:
            return state;
    }
};
