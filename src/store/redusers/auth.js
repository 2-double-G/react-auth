
import { AUTH_ERROR, AUTH_SUCCESS, LOGOUT } from './../actions/actionTypes';

const initialState = {
    token: null,
    success: false,
    isError: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                success: true,
                isError: false
            } 
        case AUTH_ERROR:
            return {
                ...state,
                success: false,
                isError: true
            }
        default:
            return state;
    }
}