import React from "react";
import PropTypes from "prop-types";
import classes from "./Input.module.scss";

const isInvalid = (valid, touched) => {
  return !valid && touched;
};

const renderErrorMessage = (valid, touched, errorMessage) => {
  return isInvalid(valid, touched) ? <span>{errorMessage}</span> : null;
};

const Input = ({ addClass, type, label, value, onChange, errorMessage, valid, touched }) => {
  const cls = [classes.Input, addClass];
  const htmlFor = `${type} - ${Math.random()}`;

  if (isInvalid(valid, touched)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={type}
        name={htmlFor}
        value={value}
        onChange={onChange}
      />
      {renderErrorMessage(valid, touched, errorMessage)}
    </div>
  );
};

Input.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  addClass: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  valid: PropTypes.bool,
  touched: PropTypes.bool,
};

Input.defaultProps = {
  onChange: () => {},
  value: "",
  addClass: "",
  type: "text",
  label: "",
  errorMessage: "",
  valid: true,
  touched: false,
};

export default Input;
