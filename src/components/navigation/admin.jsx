import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminNavigation() {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/store">Back to Store</Link>
        </li>
        <li>
          <Link to="/admin/search">Search</Link>
        </li>
        <li>
          <Link to="/admin">Doc</Link>
        </li>
      </ul>
    </nav>
  );
}