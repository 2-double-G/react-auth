import React, { Component, Fragment } from 'react';
import classes from './Users.css';
import { connect } from 'react-redux';
import TableUsers from './../../components/Table/TableUsers/TableUsers';
import Input from '../../components/UI/Input/Input';
import { search } from './../../store/actions/search';

class Users extends Component {

  onChangeHandler = (event) => {
    this.props.search(event.target.value);
  }

    render() {
      return (
        <div className={classes.Users}>
          <div>
            <Input
              value={this.props.serachName}
              onChange={this.onChangeHandler}
            />
            <button>logout</button>
          </div>
          <TableUsers
            searchName={this.props.serachName}
          />
        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    serachName: state.search,
    loading: state.users.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search: name => dispatch(search(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);