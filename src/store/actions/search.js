import { SEARCH_USERS } from "./actionTypes";

export const search = (search) => {
  return {
    type: SEARCH_USERS,
    search,
  };
};
