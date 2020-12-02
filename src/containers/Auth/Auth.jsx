import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { auth } from './../../store/actions/auth';

class Auth extends Component {

    state = {
        isFormValid: false,
        inputControls: {
            userName: {
                label: 'Username',
                value: '',
                valid: false,
                touced: false,
                validation: { // rules for validation
                    required: true,
                    minLength: 1
                },
                errorMessage: 'Enter username'
            },
            password: {
                type: 'password',
                label: 'Password',
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 1
                },
                errorMessage: 'Enter password'
            },
        }
    }

    onSubmitHandler = event => {
        event.preventDefault()
    }

    inputValidation = (validation, value) => {
        if (!validation) return true;

        let isValid = true;

        if (validation.minLength) {
            isValid = isValid && value.length >= validation.minLength;
        }

        if (validation.required) {
            isValid = isValid && value.trim() !== '';
        }

        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const inputControls = { ...this.state.inputControls };
        const control = inputControls[controlName];
        
        let isFormValid = true;
        
        control.touched = true;
        control.value = event.target.value;
        control.valid = this.inputValidation(control.validation, control.value);

        inputControls[controlName] = control;

        Object.keys(inputControls).forEach(inputName => {
            isFormValid = isFormValid && inputControls[inputName].valid;
        })

        this.setState({
            isFormValid,
            inputControls
        })     
    }

    loginHandler = () => {
        this.props.auth(
            this.state.inputControls.userName.value,
            this.state.inputControls.password.value,
        )
    }

    renderInput() {
        const inputControls = { ...this.state.inputControls };
        
        return (
            Object.keys(inputControls).map((controlName, index) => {
                const control = inputControls[controlName];

                return (
                    <Input
                        key={controlName + index}
                        label={control.label}
                        type={control.type}
                        value={control.value}
                        onChange={event => this.onChangeHandler(event, controlName)}
                        errorMessage={control.errorMessage}
                        valid={control.valid}
                        touched={control.touched}
                    />)
            })
        )
    }

    renderButton() {
        return (
            <Button
                disabled={!this.state.isFormValid}
                onClick={this.loginHandler}
            >
                Login
            </Button>
        )
    }

    render() {
        return (
            <Fragment>
                <div className={classes.Auth}>
                    <div>
                        <form onSubmit={this.onSubmitHandler}>
                            <h1>Sign in</h1>
                            {
                                this.props.isError
                                    ? <span className={classes.error}>Wrong username/password</span>
                                    : null
                            }
                            {this.renderInput()}
                            {this.renderButton()}
                        </form>
                    </div>
                </div>
                {
                    this.props.token
                        ? <Redirect to={'/users'} />
                        : null
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isError: state.auth.isError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password) => dispatch(auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);