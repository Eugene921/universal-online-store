import React from 'react';
import PropTypes from 'prop-types';

function ArrFileInput ({ arr, name, onAddItem, checkValue, fileSelectedHendler }) {
  const elemArr = arr.map((item, i) => {

    const key = Math.floor(Math.random() * 100) + item;

    return (
      <li key={key}>
        { !item ? <input accept="image/*" type="file" onChange={fileSelectedHendler}/> : null }
        <input type="text" onBlur={() => checkValue(i)} defaultValue={item} />
      </li>
    );
  });

  return (
    <ul>
      <li>{ name }:</li>
      {elemArr} 
      <li><button onClick={onAddItem}>Add</button></li>
  </ul>
  );
}

ArrFileInput.propTypes = {
  arr: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  onAddItem: PropTypes.func,
  checkValue: PropTypes.func,
  fileSelectedHendler: PropTypes.func,
};

export default ArrFileInput;