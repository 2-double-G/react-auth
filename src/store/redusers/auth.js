
import {
	AUTH_START,
	AUTH_ERROR,
	AUTH_SUCCESS,
	AUTH_LOGOUT
} from './../actions/actionTypes';

const initialState = {
	token: null,
	success: false,
	isError: false,
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_START:
			return {
				...state,
				token: localStorage.getItem('token')
			}
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
		case AUTH_LOGOUT:
			return {
				...state,
				token: null
			}
		default:
			return state;
	}
}