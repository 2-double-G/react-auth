import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';

import classes from './Users.css';

import TableUsers from './../../components/Table/TableUsers/TableUsers';
import Input from '../../components/UI/Input/Input';

import { search } from './../../store/actions/search';
import { users} from '../../store/actions/users';

class Users extends Component {

  componentDidMount() {
    this.props.users();
  }

  onChangeHandler = event => {
    this.props.search(event.target.value);
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
                  <Link
                    to={'/logout'}
                  >
                    Logout
                  </Link>
                  </div>
                <TableUsers
                  searchName={this.props.serachName}
                  userss={this.props.usersData}
                />
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
    loading: state.users.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    users: () => dispatch(users()),
    search: name => dispatch(search(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);