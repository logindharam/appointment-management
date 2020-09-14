import { APPOINTMENT_LIST,APPOINTMENT_DETAIL } from '../actions/types';

const initialState = {
    appointments: [],
    appointment: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case APPOINTMENT_LIST:
            return {
                ...state,
                appointments: action.payload,
            };
        case APPOINTMENT_DETAIL:
            return {
                ...state,
                appointment: action.payload,
            };
        default:
            return state;
    }
};
