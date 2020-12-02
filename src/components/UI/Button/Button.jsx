import React from 'react';
import classes from './Button.css';

const Button = props => (
    <button
      className={classes.Button}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
)

export default Button;