import {
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    data: [],
    success: false,
    loading: true
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_START:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                data: action.data,
                success: true,
                loading: false
            }
        default:
            return state;
    }
}