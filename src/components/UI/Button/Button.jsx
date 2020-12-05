import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.scss';

const Button = props => (
    <button
      className={classes.Button}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
)

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
}

export default Button;