import React from 'react';
import PropTypes from 'prop-types';

function SizesBar(props) {
  const { sizes, onChangeSelectSizeIndex, selectSizeIndex } = props;

  const elemSizesBar = sizes.map((size, i) => {
    return (
      <li
        onClick={() => onChangeSelectSizeIndex(i)}
        key={size}
        style={{borderColor: `${i === selectSizeIndex ? 'darkgray' : 'transparent'}`}}
      >
      {size}
      </li>
    );
  });
 
  return <ul className="store_item_sizes_bar">{ elemSizesBar }</ul>;
}

SizesBar.propTypes = {
  sizes: PropTypes.arrayOf(PropTypes.string),
  selectSizeIndex: PropTypes.number,
  onChangeSelectSizeIndex: PropTypes.func,
};

export default SizesBar;