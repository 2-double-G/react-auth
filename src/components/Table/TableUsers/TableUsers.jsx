import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { EnhancedTableHead } from '../TableHead/TableHead';
import { EnhancedTableRow } from '../TableRow/TableRow';

import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import { users } from './../../../store/actions/users';
import { filter } from './../../../store/actions/filter';

const theme = createMuiTheme({
  overrides: {
      MuiTableCell: {
          root: {  
            padding: '5px 10px',
            boxSizing: 'border-box'
          },
    }
  },
});

class TableUsers extends Component {

  sortClickHandler = () => {
    const order = this.props.order === 'asc' ? 'desc' : 'asc';
    this.props.filter(order);
  }

    render() {

      const sorted = this.props.userss.sort((a, b) => {
        if (a.id < b.id)
          return this.props.order === 'asc' ? -1 : 1
        if (a.id > b.id)
          return this.props.order === 'asc' ? 1 : -1
        return 0
      })

      return (
        <ThemeProvider theme={theme}>
          <TableContainer style={{borderRadius: 10}}>
              <Table
                aria-label="collapsible table"
                style={{ minWidth: 420, width: '100%', margin: '0 auto'}}
              >
                <EnhancedTableHead
                  order={this.props.order}
                  tableHead={this.props.userss[0]}
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
        </ThemeProvider>
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