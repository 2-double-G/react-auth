import { SEARCH_USERS } from "../actions/actionTypes";

const initialState = '';

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return action.search;
    default:
      return state;
  }
}