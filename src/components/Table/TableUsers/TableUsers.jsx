import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { EnhancedTableHead } from '../TableHead/TableHead';
import { EnhancedTableRow } from '../TableRow/TableRow';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { users } from './../../../store/actions/users';

class TableUsers extends Component {

    state = {
        order: 'asc', 
        orderBy: 'id',
        search: ''
    }

    componentDidMount() {
        this.props.users();
    }    

    sortClickHandler = (event) => {
        const order = this.state.order === 'asc' ? 'desc' : 'asc';

        this.setState({
            order
        })
    }

    sortedData = (arr) => {
        const copy = arr.map(item => { return item });
        
        return [].slice.call(copy).sort((a, b) => {
            if (a.id < b.id)
                return this.state.order === 'asc' ? -1 : 1
            if (a.id > b.id)
                return this.state.order === 'asc' ? 1 : -1
            return 0
        })
    }

    handleInputChange = (event) => {
        this.setState({
            search: event.target.value
        })
    }
    
    render() {
      return (
        <Fragment>
          {/* <input type="text" onChange={this.handleInputChange} /> */}
          {this.props.loading
            ? <CircularProgress />
            : <TableContainer>
              <Table
                aria-label="collapsible table"
                style={{ minWidth: 550, overflow: 'hidden', width: 100 }}
              >
                <EnhancedTableHead
                  order={this.state.order}
                  tableHead={this.props.usersData[0]}
                  onClick={this.sortClickHandler}
                />
                <TableBody>
                  {this.sortedData(this.props.usersData).map((row, index) => (
                    row.username.toLowerCase().includes(this.state.search.toLowerCase().trim(' '))
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
        loading: state.users.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        users: () => dispatch(users())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableUsers);