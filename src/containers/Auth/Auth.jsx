import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Auth.module.scss";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import { auth } from "./../../store/actions/auth";
import Loader from "../../components/Loader/Loader";
import { pushButton, showFormState } from "./../../store/actions/form";
import { inputValidation } from "../../form/formFramework";
import { validateForm } from "./../../form/formFramework";

class Auth extends Component {
  onSubmitHandler = (event) => {
    event.preventDefault();
  };

  onChangeHandler = (event, controlName) => {
    const { isButtonTouched, changeFormState } = this.props;
    const inputControls = { ...this.props.formState.inputControls };
    const control = inputControls[controlName];

    control.touched = true;
    control.value = event.target.value;
    control.valid = inputValidation(control.validation, control.value);

    inputControls[controlName] = control;

    isButtonTouched(false);
    changeFormState({
      isFormValid: validateForm(inputControls),
      inputControls,
    });
  };

  loginHandler = () => {
    const { auth, isButtonTouched } = this.props;
    const username = this.props.formState.inputControls.username.value;
    const password = this.props.formState.inputControls.password.value;

    isButtonTouched(true);
    auth(username, password);
  };

  renderInput() {
    const inputControls = { ...this.props.formState.inputControls };

    return Object.keys(inputControls).map((controlName, index) => {
      const { label, type, value, errorMessage, valid, touched } = inputControls[controlName];

      return (
        <Input
          key={index}
          label={label}
          type={type}
          value={value}
          onChange={(event) => this.onChangeHandler(event, controlName)}
          errorMessage={errorMessage}
          valid={valid}
          touched={touched}
        />
      );
    });
  }

  renderButton() {
    const { loading } = this.props;
    const isFormValid = this.props.formState.isFormValid;
    const disabled = loading || !isFormValid;

    return (
      <Button disabled={disabled} onClick={this.loginHandler}>
        {loading ? <Loader variant="mini" /> : "Login"}
      </Button>
    );
  }

  renderErrorMessage(isError, touched) {
		return isError && touched
			? <span className={classes.error}>Wrong username or password</span>
			: null
  }

  render() {
    const { isAuthenticated, isError } = this.props;
    const touched = this.props.formState.touchedButton;
    
    if (isAuthenticated) {
      return <Redirect to="/users" />;
    }

    return (
      <div className={classes.Auth}>
        <div>
          <form onSubmit={this.onSubmitHandler}>
            <h1>Sign in</h1>
            {this.renderErrorMessage(isError, touched)}
            {this.renderInput()}
            {this.renderButton()}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.auth.token,
    isError: state.auth.isError,
    loading: state.auth.loading,
    formState: state.form,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password) => dispatch(auth(email, password)),
    changeFormState: (formState) => dispatch(showFormState(formState)),
    isButtonTouched: (touched) => dispatch(pushButton(touched)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
