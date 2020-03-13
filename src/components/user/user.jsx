import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOutCurrentUser } from '../../actions';

function User({ currentUser, signOutCurrentUser }) {
  
  return (
    <div>
      <h2>User</h2>
      <div>{JSON.stringify(currentUser)}</div>
      <button onClick={signOutCurrentUser}>Sign Out</button>
    </div>
  );
}

User.propTypes = {
  currentUser: PropTypes.object,
  signOutCurrentUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutCurrentUser: () => dispatch(signOutCurrentUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(User);