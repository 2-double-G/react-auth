import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import TableSortLabel from "@material-ui/core/TableSortLabel";

import classes from "./Users.module.scss";

import Table from "../../components/Table/Table";
import Input from "../../components/UI/Input/Input";
import Button from "./../../components/UI/Button/Button";

import { users } from "../../store/actions/users";
import { search } from "./../../store/actions/search";
import { filter } from "./../../store/actions/filter";
import Loader from "../../components/Loader/Loader";

class Users extends Component {
  componentDidMount() {
    this.props.users();
  }

  onChangeHandler = (event) => {
    this.props.search(event.target.value);
  };

  sortClickHandler = () => {
    const order = this.props.order === "asc" ? "desc" : "asc";
    this.props.filter(order);
  };

  renderUI = (searchName, order) => (
    <div>
      <Input
        addClass={classes.input}
        label="Search username"
        value={searchName}
        onChange={this.onChangeHandler}
      />
      <Button onClick={this.sortClickHandler}>
        Sort by Id
        <TableSortLabel active direction={order}></TableSortLabel>
      </Button>
      <Link to="/logout">Logout</Link>
    </div>
  );

  renderUsers = (searchName, order, sorted, headingColumns) => (
    <div>
      {this.renderUI(searchName, order)}
      <Table data={sorted} headingColumns={headingColumns} />
    </div>
  );

  render() {
    const headingColumns = [
      "id",
      "username",
      "first_name",
      "last_name",
      "is_active",
      "last_login",
      "is_superuser",
    ];
    const { usersData, order, searchName } = this.props;
    const sorted = usersData
      .sort((a, b) => {
        if (a.id < b.id) return order === "asc" ? -1 : 1;
        if (a.id > b.id) return order === "asc" ? 1 : -1;
        return 0;
      })
      .filter((item) =>
        item.username.toLowerCase().includes(searchName.toLowerCase().trim(" "))
      );

    return (
      <div className={classes.Users}>
        {this.props.loading ? <Loader /> : this.renderUsers(searchName, order, sorted, headingColumns)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersData: state.users.data,
    searchName: state.search,
    loading: state.users.loading,
    order: state.filter.direction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    users: () => dispatch(users()),
    search: (name) => dispatch(search(name)),
    filter: (order) => dispatch(filter(order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
