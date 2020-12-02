import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';
import Users from './containers/Users/Users';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path={'/users'} component={Users}/>
          <Route path={'/login'} component={Auth} />
          <Redirect from={'/'} to={'/login'}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
