import axios from 'axios';
import {
    FETCH_USERS_SUCCESS
} from "./actionTypes";


export const users = () => {
    return async dispatch => {      

        const url = 'http://emphasoft-test-assignment.herokuapp.com/api/v1/users/';
        const token = localStorage.getItem('token');

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
            
            dispatch(userSucsess(prepareData))
        } catch (error) {
            console.log('error');           
        }
    }
}

export const userSucsess = (data) => {
    return {
        type: FETCH_USERS_SUCCESS,
        data
    }
}