import { FILTER_USERS } from "./actionTypes";

export const filter = (order) => {
  return {
    type: FILTER_USERS,
    order,
  };
};
