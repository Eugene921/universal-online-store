import React from 'react';
import { Link } from 'react-router-dom';
import firebaseApp from '../../base/base_auth';
import PropTypes from 'prop-types';

export default function Admin(props) {
  const nawLink = props.match.isExact;

  return (
    <div className="admin_tools">
      <button onClick={() => firebaseApp.auth().signOut()}>Sing Out</button>
      <h2>It is tools for - Admin</h2>
      <ul className="nav_bar_for_admin">
        <li className={nawLink ? 'active' : ''} >
          <Link to="/admin">Docs</Link>
        </li>
        <li className={!nawLink ? 'active' : ''} >
          <Link to="/admin/search">Search</Link>
        </li>
      </ul>
      <div className="tools_bar">
      </div>
    </div>
  );
}

Admin.propTypes = {
  match: PropTypes.any,
};

