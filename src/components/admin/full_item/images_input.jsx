import React from 'react';
import PropTypes from 'prop-types';

function ImagesInput ({ images, name, onAddItem, checkValue, fileSelectedHendler }) {
  const onCheckValue = (index) => {
    const newImageSrc = event.target.value;

    checkValue(index, { src: newImageSrc });
  };

  const elemArr = images.map((item, i) => {
    // const key = Math.floor(Math.random() * 100) + item.src;

    return (
      <li key={item.src}>
        { !item.src ? <input accept="image/*" type="file" onChange={e => fileSelectedHendler(e, i)}/> : null }
        <input type="text" onBlur={() => onCheckValue(i)} defaultValue={item.src} />
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

ImagesInput.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })),
  name: PropTypes.string,
  onAddItem: PropTypes.func,
  checkValue: PropTypes.func,
  fileSelectedHendler: PropTypes.func,
};

export default ImagesInput;