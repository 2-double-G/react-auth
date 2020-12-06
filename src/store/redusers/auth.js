import {
  AUTH_START,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  GET_TOKEN,
} from "./../actions/actionTypes";

const initialState = {
  token: null,
  success: false,
  isError: false,
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        success: true,
        isError: false,
        loading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        success: false,
        isError: true,
        loading: false,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
      };
    case GET_TOKEN:
      return {
        ...state,
        token: localStorage.getItem("token"),
      };
    default:
      return state;
  }
};
