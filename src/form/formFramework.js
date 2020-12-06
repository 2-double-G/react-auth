export const createControl = (type, label, errorMessage) => {
  return {
    type,
    label,
    value: "",
    valid: false,
    touched: false,
    errorMessage,
    validation: {
      required: true,
      minLength: 1,
    },
  };
};

export const inputValidation = (validation, value) => {
  let isValid = true;

  if (validation.minLength) {
    isValid = isValid && value.length >= validation.minLength;
  }

  if (validation.required) {
    isValid = isValid && value.trim() !== "";
  }

  return isValid;
};

export function validateForm(formControls) {
  let isFormValid = true;

  for (let control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid;
    }
  }

  return isFormValid;
}
