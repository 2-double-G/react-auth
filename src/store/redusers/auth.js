
import { AUTH_ERROR, AUTH_SUCCESS } from './../actions/actionTypes';

const initialState = {
    token: null,
    isError: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token
            } 
        case AUTH_ERROR:
            return {
                ...state,
                isError: true
            }
        default:
            return state;
    }
}