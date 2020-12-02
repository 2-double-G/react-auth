import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export const EnhancedTableHead = props => {
  const headNames = Object.keys(props.tableHead);

  return (
    <TableHead style={{backgroundColor: '#9c89b8'}}>
      <TableRow>
        <TableCell />
        {
          headNames.slice(0, -1).map((name, index) => {
            return (
              <TableCell
                key={index}
                style={{ color: '#fff' }}
                align="right"
              >
                {name}
                {
                  name === 'id'
                  ? <TableSortLabel
                    active={true}
                    direction={props.order}
                    onClick={props.onClick}
                    >
                    </TableSortLabel>
                  : null
                }
              </TableCell>
            )
          })
        }
      </TableRow>
    </TableHead>
  )
}