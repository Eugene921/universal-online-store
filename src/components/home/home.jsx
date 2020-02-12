import React from 'react';
import PropTypes from 'prop-types';

function Home({ someText }) {
  return (
    <div>
      <h2>Home</h2>
      <p>{someText}</p>
    </div>
  );
}

Home.propTypes = {
  someText: PropTypes.string,
};

export default Home;