import React from 'react';
import PropTypes from 'prop-types';

function ArrayCheckbox(props) {
  const { array, onChangeSelectIndex, selectIndex, type } = props;

  const activeOnChangeSelectIndex = (event, index) => {
    event.preventDefault();
    onChangeSelectIndex(index);
  };

  const elemArray = array.map((item, index) => {
    return (
      <li
        onClick={event => activeOnChangeSelectIndex(event, index)}
        style={{borderColor: `${index === selectIndex ? type === 'colors' ? item : 'black' : 'transparent'}`}}
        key={item}
      >
      { type === 'colors' && <span style={{backgroundColor: item}} /> }
      { type === 'sizes' && item }
      </li>
    );
  });
 
  return <ul className={`store_item_${type}_bar`}>{ elemArray }</ul>;
}

ArrayCheckbox.propTypes = {
  array: PropTypes.arrayOf(PropTypes.string),
  selectIndex: PropTypes.number,
  onChangeSelectIndex: PropTypes.func,
  type: PropTypes.string,
};

export default ArrayCheckbox;