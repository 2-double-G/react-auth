import { SHOW_FORM_STATE, PUSH_BUTTON } from "./../actions/actionTypes";
import { createControl } from "./../../form/formFramework";

const initialState = {
  isFormValid: false,
  touchedButton: false,
  inputControls: {
    username: createControl("text", "Username", "Enter username"),
    password: createControl("password", "Password", "Enter password"),
  },
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FORM_STATE:
      return {
        ...state,
        isFormValid: action.isFormValid,
        inputControls: action.inputControls,
      };
    case PUSH_BUTTON:
      return {
        ...state,
        touchedButton: action.touchedButton,
      };
    default:
      return state;
  }
};
