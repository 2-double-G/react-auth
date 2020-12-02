import axios from 'axios';
import {
    AUTH_SUCCESS,
    AUTH_ERROR,
    LOGOUT
} from './actionTypes';


export const auth = (username, password) => {
    return async dispatch => {
        const authData = { username, password };
        const url = 'api-token-auth/';
        const instance = axios.create({
            baseURL: 'http://emphasoft-test-assignment.herokuapp.com'
        })

        try {
            const response = await instance.post(url, authData);
            const data = response.data;

            localStorage.setItem('token', data.token);

            dispatch(authSuccess(data.token))
        } catch (error) {
            console.log('error in auth');
            console.error(error);
            dispatch(authError());
        }
    }
}

export const authSuccess = token => {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export const authError = () => {
    return {
        type: AUTH_ERROR
    }
}