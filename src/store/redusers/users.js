import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  LOGOUT
} from '../actions/actionTypes';

const initialState = {
  data: [],
  success: false,
  loading: true,
  token: null
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
        loading: false,
        token: action.token
      }
    case FETCH_USERS_ERROR:
      return {
        ...state,
        isError: true,
        success: false
      }
    case LOGOUT:
      return {
        ...state,
        token: null
      }
    default:
      return state;
  }
}