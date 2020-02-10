import React from "react";

export default function ColorsBar(props) {
  const { colors } = props;

  const elemColorsBar = colors.map(color => {
    return <li style={{backgroundColor: color}} key={color} />
  });
 
  return <ul className="store_item_colors_bar">{ elemColorsBar }</ul>
}