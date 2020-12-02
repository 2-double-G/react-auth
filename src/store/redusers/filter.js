import { FILTER_USERS } from "../actions/actionTypes";

const initialState = {
    direction: 'asc'
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_USERS:
      return {
        ...state,
        direction: action.order
      }
    default:
      return state;
  }
}