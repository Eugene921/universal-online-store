import React from 'react';
// import { Link } from 'react-router-dom';
import firebaseApp from '../../../data_base/base';
import PropTypes from 'prop-types';

export default function AdminToolBar() {
  // const nawLink = props.match.isExact;

//   <ul className="nav_bar_for_admin">
//   <li className={nawLink ? 'active' : ''} >
//     <Link to="/admin">Docs</Link>
//   </li>
//   <li className={!nawLink ? 'active' : ''} >
//     <Link to="/admin/search">Search</Link>
//   </li>
// </ul>
// <div className="tools_bar">
// </div>

  return (
    <div className="admin_tools">
      <button onClick={() => firebaseApp.auth().signOut()}>Sing Out</button>
      <h2>It is tools for - Admin</h2>
    </div>
  );
}

AdminToolBar.propTypes = {
  match: PropTypes.any,
};

