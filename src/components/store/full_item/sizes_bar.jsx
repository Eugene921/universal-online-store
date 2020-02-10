import React from "react";

export default function SizesBar(props) {
  const { sizes } = props;

  const elemSizesBar = sizes.map(size => {
    return <li key={size}>{size}</li>
  });
 
  return <ul className="store_item_sizes_bar">{ elemSizesBar }</ul>
}