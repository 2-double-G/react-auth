import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';

import classes from './Users.css';

import TableUsers from './../../components/Table/TableUsers/TableUsers';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import { search } from './../../store/actions/search';
import { users, logout } from '../../store/actions/users';

class Users extends Component {

  componentDidMount() {
    this.props.users();
  }

  onChangeHandler = event => {
    this.props.search(event.target.value);
  }

  logoutHandler = () => {
    this.props.logout();
  }

    render() {
      return (
        <div className={classes.Users}>     
          {
            this.props.loading
              ? <CircularProgress />
              : <div>
                  <div>
                  <Input
                      label='Search username'
                      value={this.props.serachName}
                      onChange={this.onChangeHandler}
                    />
                    <Button
                      onClick={() => this.logoutHandler()}
                    >
                      logout
                    </Button>
                  </div>
                <TableUsers
                  searchName={this.props.serachName}
                  userss={this.props.usersData}
                />                
                {
                  !this.props.token 
                    ? <Redirect to={'/login'} />
                    : null
                }
              </div>
            }        
          </div>
      )
    }
}

const mapStateToProps = state => {
  return {
    usersData: state.users.data,
    serachName: state.search,
    loading: state.users.loading,
    token: state.users.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    users: () => dispatch(users()),
    logout: () => dispatch(logout()),
    search: name => dispatch(search(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);