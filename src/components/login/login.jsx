import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginCurrentUser } from '../../actions';
import { Redirect } from 'react-router-dom';

const LogInAdmin = ({ loginCurrentUser, currentUser }) => {
  const hendleLogin = async e => {
      e.preventDefault();
      const { email, password } = e.target.elements;

      loginCurrentUser({ email: email.value, password: password.value });
    };

  return (
      <div className="login_to_admin">
        { currentUser ? (
          <Redirect to="/user" />
        ) : (
          <form onSubmit={hendleLogin}>
            <label>
              Email
              <input name="email" type="email" placeholder="Email"></input>
            </label>
            <label>
              Password
              <input name="password" type="password" placeholder="Password"></input>
            </label>
            <button type="submit">Log in</button>
          </form>
        ) }
      </div>
  );
};

LogInAdmin.propTypes = {
  loginCurrentUser: PropTypes.func,
  currentUser: PropTypes.object,
};


const mapStateToProps = (store) => ({
  currentUser: store.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  loginCurrentUser: loginData => dispatch(loginCurrentUser(loginData))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogInAdmin);