import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateComponent = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={props => (
    auth === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: {from: props.location}
      }}/>
  )}
  />
);

export default PrivateComponent;