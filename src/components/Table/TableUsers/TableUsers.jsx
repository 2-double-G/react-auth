import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';


import { EnhancedTableHead } from '../TableHead/TableHead';
import { EnhancedTableRow } from '../TableRow/TableRow';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import CircularProgress from '@material-ui/core/CircularProgress';
import { users } from './../../../store/actions/users';
import { filter } from './../../../store/actions/filter';

class TableUsers extends Component {

  componentDidMount() {
      this.props.users();
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

      return (
        <Fragment>
          {this.props.loading
            ? <CircularProgress />
            : <TableContainer >
              <Table
                aria-label="collapsible table"
                style={{ maxWidth: 550, overflow: 'hidden', width: '100%', borderRadius: 15, margin: '0 auto'}}
              >
                <EnhancedTableHead
                  order={this.props.order}
                  tableHead={this.props.usersData[0]}
                  onClick={() => this.sortClickHandler()}
                />
                <TableBody style={{background: '#fff'}}>
                  {sorted.map((row, index) => (
                    row.username.toLowerCase().includes(this.props.searchName.toLowerCase().trim(' '))
                      ? <EnhancedTableRow key={index} row={row} />
                      : null
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          }
        </Fragment>
      );
    }
}

const mapStateToProps = state => {
  return {
    usersData: state.users.data,
    loading: state.users.loading,
    order: state.filter.direction
  }
}

const mapDispatchToProps = dispatch => {
  return {
    users: () => dispatch(users()),
    filter: order => dispatch(filter(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableUsers);