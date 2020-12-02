import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
        borderBottom: 'unset'
      },
  },
});

export const EnhancedTableRow = props => {
  const { row } = props;
  const rowItems = Object.keys(row);
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  
  return (
    <Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
        </TableCell>
        {
          rowItems.slice(0, -1).map((item, index) => {
                return (
                    <TableCell
                        key={index}
                        align="right"
                        component={item === 'id' ? 'th' : 'td'}
                        scope={item === 'id' ? 'row' : null}
                    >
                        {`${row[item]}`}
                    </TableCell>
                )
            })
        }
      </TableRow>
      <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1} style={{ maxWidth: 600 }}>
            <Typography variant="h6" gutterBottom component="div">
              Detail
            </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                      {
                        Object.keys(row.detail).map((item, index) => {
                          return (                                                   
                            <TableCell
                              key={index}
                            >
                              {item}
                            </TableCell>
                          )
                        })
                      }
                      </TableRow>
                  </TableHead>
                <TableBody>
                  <TableRow >      
                    {
                      Object.keys(row.detail).map((item, index) => {
                        return (
                          <TableCell
                            key={index}
                            component={item === 'id' ? 'th' : 'td'}
                            scope={item === 'id' ? 'row' : null}
                          >
                            {`${row.detail[item]}`}
                          </TableCell>
                        )
                      })
                    }
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}