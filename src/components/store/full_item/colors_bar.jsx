import React from 'react';
import PropTypes from 'prop-types';

function ColorsBar(props) {
  const { colors, onChangeSelectColorIndex, selectColorIndex } = props;

  const elemColorsBar = colors.map((color, i) => {
    return (
      <li
        onMouseDown={() => onChangeSelectColorIndex(i)}
        style={{borderColor: `${i === selectColorIndex ? color : 'transparent'}`}}
        key={color}
      >
        <span style={{backgroundColor: color}} />
      </li>
    );
  });
 
  return <ul className="store_item_colors_bar">{ elemColorsBar }</ul>;
}

ColorsBar.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  selectColorIndex: PropTypes.number,
  onChangeSelectColorIndex: PropTypes.func,
};

export default ColorsBar;