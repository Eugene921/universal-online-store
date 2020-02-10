import React from 'react';
import PropTypes from 'prop-types';

function CastomTextArea ({ name, value }) {
  return (
      <label>
        {name}:
        <textarea rows="15" cols="60" defaultValue={value} />
      </label> 
  );
}

CastomTextArea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string
};

export default CastomTextArea;