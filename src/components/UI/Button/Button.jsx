import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.scss";

const Button = ({ disabled, onClick, children }) => (
  <button
    className={classes.Button}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
};

export default Button;
