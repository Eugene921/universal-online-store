import React, { useCallback } from 'react';
import firebaseApp from '../../base/base';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// import { Route, withRouter } from "react-router-dom";

const LogInAdmin = ({ history }) => {
  
  const hendleLogin = useCallback(
    async e => {
      e.preventDefault();
      const { email, password } = e.target.elements;
  
      try {
        await firebaseApp
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
          history.push('/admin');
  
      } catch (error) {
        alert(error);
      }
    }, [history]);

  return (
      <div className="login_to_admin">
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
      </div>
  );
};

LogInAdmin.propTypes = {
  history: PropTypes.any,
};


export default withRouter(LogInAdmin);