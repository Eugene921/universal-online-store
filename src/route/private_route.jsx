import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../auth/auth_admin';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  
  return (
    <Route
    {...rest}
    render={routeProps => {
      return currentUser ? <RouteComponent {...routeProps} /> : <Redirect to="/admin/login" />;
    }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func
};


export default PrivateRoute;