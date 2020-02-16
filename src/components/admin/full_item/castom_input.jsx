import React from 'react';
import PropTypes from 'prop-types';

function CastomInput ({ name, value, onChange }) {
  return (
      <label>
        {name}:
        <input type="text" value={value} onChange={e => onChange(e.target.value)} />
      </label> 
  );
}

CastomInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

export default CastomInput;