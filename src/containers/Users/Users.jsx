import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TableSortLabel from '@material-ui/core/TableSortLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

import classes from './Users.module.scss';

import Table from '../../components/Table/Table';
import Input from '../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';

import { users} from '../../store/actions/users';
import { search } from './../../store/actions/search';
import { filter } from './../../store/actions/filter';

class Users extends Component {

  componentDidMount() {
    this.props.users();
  }

  onChangeHandler = event => {
    this.props.search(event.target.value);
  }

  sortClickHandler = () => {
    const order = this.props.order === 'asc' ? 'desc' : 'asc';
    this.props.filter(order);
  }

  render() {

    const sorted = this.props.usersData.sort((a, b) => {
      if (a.id < b.id)
        return this.props.order === 'asc' ? -1 : 1
      if (a.id > b.id)
        return this.props.order === 'asc' ? 1 : -1
      return 0
    })
    .filter(item => (
      item.username.toLowerCase().includes(this.props.searchName.toLowerCase().trim(' '))
    ))

      return (
        <div className={classes.Users}>
          {
            this.props.loading
              ? <CircularProgress
                style={{ position: 'absolute', top: '50%', left: '50%' }}
              />
              : <div>
                  <div>
                  <Input
                      class={classes.input}
                      label='Search username'
                      value={this.props.searchName}
                      onChange={this.onChangeHandler}
                  />
                  <Button onClick={() => this.sortClickHandler()} > 
                    Sort by Id
                    <TableSortLabel
                    active={true}
                    direction={this.props.order}
                    >
                    </TableSortLabel>
                  </Button>
                  <Link
                    to={'/logout'}
                  >
                    Logout
                  </Link>
                  </div>
                <Table
                  data={sorted}
                  headingColumns={['id', 'username', 'first_name', 'last_name', 'is_active', 'last_login', 'is_superuser']}              
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
    searchName: state.search,
    loading: state.users.loading,    
    order: state.filter.direction
  }
}

const mapDispatchToProps = dispatch => {
  return {
    users: () => dispatch(users()),
    search: name => dispatch(search(name)),
    filter: order => dispatch(filter(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);