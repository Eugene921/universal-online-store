import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, currentUser, ...props}, ...rest) => {
  return (
    <Route
    {...rest}
    render={() => currentUser ? <RouteComponent {...props} /> : <Redirect to="/login" />}
    />
  );
};

PrivateRoute.propTypes = {
  currentUser: PropTypes.object,
  component: PropTypes.any,
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, {})(PrivateRoute);