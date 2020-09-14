import axios from 'axios';
import setAuthToken from './../util/setAuthToken';

import { APPOINTMENT_LIST, APPOINTMENT_DETAIL } from './types';

import { setLoading } from './miscActions';
import { toastSuccessMessage, toastErrorMessage } from './../util';

export const getAppointments = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/appointments');
        console.log(res)
        dispatch(setLoading(false));
        dispatch({
            type: APPOINTMENT_LIST,
            payload: res.data.appointment,
        });
    } catch (error) {
        dispatch(setLoading(false));
        toastErrorMessage(error.response.data.msg);
    }
};

export const addAppointments = (appointment) => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.post('/api/appointments', appointment);
        dispatch(setLoading(false));
        dispatch(getAppointments());
        toastSuccessMessage('Appointment added successfully')
    } catch (error) {
        dispatch(setLoading(false));

        error.response.data.errors.map((err) => {
            toastErrorMessage(err.msg);
        });
    }
};

export const getAppointment = (id) => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/appointments/' + id);
        dispatch(setLoading(false));
        dispatch({
            type: APPOINTMENT_DETAIL,
            payload: res.data.appointment,
        });
    } catch (error) {
        dispatch(setLoading(false));
    }
};
export const updateAppointments = (appointment) => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.put('/api/appointments/' + appointment._id, appointment);
        dispatch(setLoading(false));
        toastSuccessMessage('Appointments updated successfully')
    } catch (error) {
        dispatch(setLoading(false));
    }
};
export const deleteAppointment = (id) => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.delete('/api/appointments/' + id);
        dispatch(setLoading(false));
        dispatch(getAppointments());
        toastSuccessMessage('Appointment deleted successfully')
    } catch (error) {
        dispatch(setLoading(false));
    }
};
