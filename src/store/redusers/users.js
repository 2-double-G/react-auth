import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR
} from '../actions/actionTypes';

const initialState = {
  data: [],
  loading: true,
<<<<<<< HEAD
  isErorr: false
=======
  isError: false
>>>>>>> 29241732b6b0758936e162977151ed583f4c0014
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
        loading: false
      }
    case FETCH_USERS_ERROR:
      return {
        ...state,
        isError: true
      }
    default:
      return state;
  }
}
