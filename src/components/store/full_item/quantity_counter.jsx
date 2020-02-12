import React from 'react';
import PropTypes from 'prop-types';

export default function QuantityСounter({ quantity, onAdd, onRemove }) {
  return (
    <div className="product_quantity_wrapper">
      <span>Quantity:</span>
      <div className="product_quantity">
        <span>{quantity}</span>
        <span onClick={onAdd}>+</span>
        <span onClick={onRemove}>-</span>
      </div>
    </div>
  );
}

QuantityСounter.propTypes = {
  quantity: PropTypes.number,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};