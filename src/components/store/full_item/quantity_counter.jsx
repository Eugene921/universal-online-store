import React from "react";

export default function QuantityСounter() {
  return (
    <div className="store_item_quantity_wrapper">
      <p>quantity:</p>
      <div className="store_item_quantity">
        <span id="store_item_quantity_value">1</span>
        <span id="store_item_quantity_plus">+</span>
        <span id="store_item_quantity_minus">-</span>
      </div>
    </div>
  )
}