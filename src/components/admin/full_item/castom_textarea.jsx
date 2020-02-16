import React from 'react';
import PropTypes from 'prop-types';

function CastomTextArea ({ name, value, onChange }) {
  return (
      <label>
        {name}:
        <textarea rows="15" cols="60" value={value} onChange={e => onChange(e.target.value)} />
      </label> 
  );
}

CastomTextArea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default CastomTextArea;