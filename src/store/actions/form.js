import { SHOW_FORM_STATE, PUSH_BUTTON } from "./actionTypes";

export const showFormState = ({ isFormValid, inputControls }) => {
  return {
    type: SHOW_FORM_STATE,
    isFormValid,
    inputControls,
  };
};

export const pushButton = (touchedButton) => {
  return {
    type: PUSH_BUTTON,
    touchedButton,
  };
};
