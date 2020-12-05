import React from 'react';
import PropTypes from 'prop-types';
import classes from './Table.module.scss';

const Table = props => {

  const { data } = props;
  
  const row = data.map((item, index) => (
    <tr key={index}>
      {
        Object.keys(item).map((info, index) => {
            return <td key={index} data-heading={info}>{`${item[info]}`}</td>
        })
      }
    </tr>
  ))

  const isDataEmty = (data) => {
    return JSON.stringify(data) === '[]';
  }

  return (
      <div className={classes.TableContainer}>
        <table>
          <thead>
            <tr>
              {
                props.headingColumns.map((head, index) => (
                  <th key={index}>{head}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {row}
          </tbody>
        </table>
        {
          isDataEmty(data)
          ? <span>There is no such user</span>
          : null
        }
      </div>
    )
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired
}

Table.defaultProps = {
  data: [],
  headingColumns: []
}

export default Table;