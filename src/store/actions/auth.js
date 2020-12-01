import axios from 'axios';
import {
    AUTH_SUCCESS,
    AUTH_ERROR
} from './actionTypes';


export const auth = (username, password) => {
    return async dispatch => {
        const authData = { username, password };
        const url = 'api-token-auth/';

        try {
            const instance = axios.create({
                baseURL: 'http://emphasoft-test-assignment.herokuapp.com',
                headers: {
                    accept: 'application/json'
                }
            })
            const response = await instance.post(url, authData);
            const data = response.data;

            console.log(response);

            localStorage.setItem('token', data.token);

            dispatch(authSuccess(data.token))
        } catch (error) {
            const errorMessage = error.response.data.non_field_errors[0];
            console.log(errorMessage);
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