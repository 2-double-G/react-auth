import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Users from './containers/Users/Users';
import Logout from './components/Logout/Logout';
import PrivateComponent from './components/PrivateComponent/PrivateComponent';

import { getToken } from './store/actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.isToken();
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path={'/login'} component={Auth} />
          <Route path={'/logout'} component={Logout} />
          <PrivateComponent path={'/users'} component={Users} auth={this.props.isAuthenticated} />
          <Redirect from={'/'} to={'/login'}/>
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
	return {
		isAuthenticated: !!state.auth.token
	}
}

const mapDispatchToProps = dispatch => {
	return {
		isToken: () => dispatch(getToken())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
