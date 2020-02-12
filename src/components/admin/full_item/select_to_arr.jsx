import React from 'react';
import PropTypes from 'prop-types';

function SelectToArr ({ arr, name, onAddItem, checkValue }) {
  const elemArr = arr.map((item, i) => {

    const key = Math.floor(Math.random() * 100) + item;
    const elemShowColor = name === 'Colors' ? 
      <span style={{ backgroundColor: item }} className="show_select_colors_admin" />
      : null;

    return (
      <li key={key} >
        { elemShowColor }
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

SelectToArr.propTypes = {
  arr: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  onAddItem: PropTypes.func,
  checkValue: PropTypes.func,
};

export default SelectToArr;