import React, { Component, Fragment } from 'react';
import classes from './Users.css';
import { connect } from 'react-redux';
import { users } from './../../store/actions/users';
import TableUsers from './../../components/Table/TableUsers/TableUsers';
import Input from '../../components/UI/Input/Input';

class Users extends Component {
    render() {
      return (
        <div className={classes.Users}>
            <Input />
            <TableUsers />
        </div>
      );
    }
}

const mapStateToProps = state => {
    return {
        usersData: state.users.data,
        loading: state.users.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        users: () => dispatch(users())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);