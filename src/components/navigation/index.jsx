import React from 'react';
import { Link } from 'react-router-dom';

import User from './user';
import Cart from './cart';

export default function AdminNavigation() {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/store">Store</Link>
        </li>
        <User/>
        <Cart/>
      </ul>
    </nav>
  );
}
