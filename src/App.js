import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';


class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path={'/auth'} component={ Auth }/>
          <Route path={'/'} component={ Auth }/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
