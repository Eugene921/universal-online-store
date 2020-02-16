import React from 'react';
import PropTypes from 'prop-types';

function ImagesInput ({ images, onRemoveItem, changeName, fileSelectedHendler, slidePosition }) {
  const onCheckName = (index) => {
    changeName(index, event.target.value);
  };

  const activOnRemoveItem = (index) => {
    event.preventDefault();
    
    onRemoveItem(index);
  };
  const elemArr = images.map((item, i) => {
    return (
      <li key={item.url} className={i === slidePosition ? 'active' : ''}>
      
        
        <input
          type="text"
          title="Name of image"
          placeholder="Name of image"
          disabled={!!item.path}
          onChange={() => onCheckName(i)}
          value={item.name || ''}
        />
        <button className="btn_delte_image" onClick={() => activOnRemoveItem(i)}>Delete</button>
      </li>
    );
  });

  return (
    <ul>
      <li>Images:</li>
      {elemArr} 
      <li><input accept="image/*" type="file" onChange={e => fileSelectedHendler(e)}/></li>
  </ul>
  );
}

ImagesInput.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    path: PropTypes.string,
  })),
  name: PropTypes.string,
  slidePosition:  PropTypes.number,
  onRemoveItem: PropTypes.func,
  changeName: PropTypes.func,
  fileSelectedHendler: PropTypes.func,
};

export default ImagesInput;