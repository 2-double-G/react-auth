import React from "react";
import classes from "./Loader.module.scss";

const Loader = ({ variant }) => {
  return (
    <div className={classes[variant]}>
      <div className={classes.Loader}></div>
    </div>
  );
};

export default Loader;
