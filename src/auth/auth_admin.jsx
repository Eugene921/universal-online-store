import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { firebaseAuth } from '../base/base';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState(null);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
      <AuthContext.Provider value={{currentUser}} >
        { children }
      </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element
};