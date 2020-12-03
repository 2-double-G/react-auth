import axios from 'axios';
import {
	AUTH_START,
	AUTH_SUCCESS,
	AUTH_ERROR,
	AUTH_LOGOUT
} from './actionTypes';


export const auth = (username, password) => {
	return async dispatch => {
		const authData = { username, password };
		const url = 'api-token-auth/';
		const instance = axios.create({
			baseURL: 'https://emphasoft-test-assignment.herokuapp.com'
		})

		try {
			const response = await instance.post(url, authData);
			const data = response.data;

			localStorage.setItem('token', data.token);

			dispatch(authSuccess(data.token))
		} catch (error) {
			console.error(error);
			dispatch(authError());
		}
	}
}

export const authStart = () => {
	return {
		type: AUTH_START
	}
}

export const authSuccess = token => {
	return {
		type: AUTH_SUCCESS,
		token
	}
}

export const logout = () => {
	localStorage.removeItem('token');
	return {
		type: AUTH_LOGOUT
	}
}

export const authError = () => {
	return {
		type: AUTH_ERROR
	}
}