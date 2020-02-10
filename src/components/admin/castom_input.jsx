import React from 'react';
import PropTypes from 'prop-types';

function CastomInput ({ name, value }) {
  return (
      <label>
        {name}:
        <input type="text" defaultValue={value} />
      </label> 
  );
}

CastomInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default CastomInput;