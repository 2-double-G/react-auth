import axios from 'axios';
import {
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS,
    LOGOUT
} from "./actionTypes";


export const users = () => {
    return async dispatch => {      

        const url = 'http://emphasoft-test-assignment.herokuapp.com/api/v1/users/';
        const token = localStorage.getItem('token');

        dispatch(fetchUserStart());

        try {
            const response = await axios.get(url, {headers: {
                Authorization: `Token ${token}`
            }});
            const data = response.data;

            const prepareData = [];

            data.forEach(item => {
                prepareData.push({
                    id: item.id,
                    username: item.username !== '' ? item.username : '-',
                    first_name: item.first_name !== '' ? item.first_name : '-',
                    last_name: item.last_name !== '' ? item.last_name : '-',
                    detail: {
                        is_active: item.is_active ? 'Active' : 'Not active',
                        last_login: item.last_login ? new Date(item.last_login).toLocaleString() : 'Unknown',
                        is_superuser: item.is_superuser ? 'yes' : 'no'
                    }
                    
                })
            })
            
            dispatch(fetchUserSucsess(prepareData, token))
        } catch (error) {
            console.log('error');           
        }
    }
}

export const fetchUserStart = () => {
    return {
        type: FETCH_USERS_START
    }
}

export const fetchUserSucsess = (data, token) => {
    return {
        type: FETCH_USERS_SUCCESS,
        data,
        token
    }
}


export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: LOGOUT
    }
}