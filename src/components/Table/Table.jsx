import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classes from "./Table.module.scss";

const renderRow = (data) => {
  return data.map((item, index) => (
    <tr key={index}>
      {Object.keys(item).map((info, index) => (
        <td key={index} data-heading={info}>{`${item[info]}`}</td>
      ))}
    </tr>
  ));
};

const renderHead = (headingColumns) => {
  return headingColumns.map((head, index) => <th key={index}>{head}</th>);
};

const renderError = (data) => {
  return JSON.stringify(data) === "[]"
    ? <span className={classes.errorMessage}>There is no such user</span>
    : null
};

const Table = ({ data, headingColumns }) => (
  <Fragment>
    <div className={classes.TableContainer}>
      <table>
        <thead>
          <tr>{renderHead(headingColumns)}</tr>
        </thead>
        <tbody>{renderRow(data)}</tbody>
      </table>
    </div>
    {renderError(data)}
  </Fragment>
);

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Table.defaultProps = {
  data: [],
  headingColumns: [],
};

export default Table;
