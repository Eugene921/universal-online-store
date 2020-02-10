import React from 'react';
import PropTypes from 'prop-types';

function SliderForProduct ({ arrImages, classNameValue, slidePosition, goToPre, goToNext }) {
  const activeGoToPre = e => {
    e.preventDefault();
    goToPre();
  };
  const activeGoToNext = e => {
    e.preventDefault();
    goToNext();
  };
  const elemArrImages = arrImages.map((item, i) => {

    const key = Math.floor(Math.random() * 100) + item;

    return <img
      key={key}
      src={item} 
      style={{ opacity: i === slidePosition ? '1' : '0', display: i === slidePosition ? 'block' : 'none',}}
    />;
  });

  return (
    <div className={classNameValue}>
      <button onClick={activeGoToPre}>❮</button>
      {elemArrImages}
      <button onClick={activeGoToNext}>❯</button>
    </div>
  );
  // return <input {...rest} type="file" onChange={onChange} />;
}
SliderForProduct.propTypes = {
  arrImages: PropTypes.arrayOf(PropTypes.string),
  classNameValue: PropTypes.string,
  slidePosition: PropTypes.number,
  goToPre: PropTypes.func,
  goToNext: PropTypes.func,
};

export default SliderForProduct;