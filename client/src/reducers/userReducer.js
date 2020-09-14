import { USER_LIST,USER_DETAIL } from '../actions/types';

const initialState = {
    users: [],
    user: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LIST:
            return {
                ...state,
                users: action.payload,
            };
        case USER_DETAIL:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};
