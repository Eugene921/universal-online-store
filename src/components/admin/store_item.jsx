import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function StoreItem({ item, deleteProduct }) {
  const { url } = useRouteMatch();

  const activeDeleteProduct = (event) => {
    event.preventDefault();

    deleteProduct(item.link);
  };

  return (
    <div className="admin_item_short">
      { item.images ? <img src={item.images[0].url} alt={item.images[0].name} /> : null }
      <div className="admin_item_short_description">
        <h3>{item.name}</h3>
        <span>{item.costPerItem || ''}</span>
      </div>
      <button className="admin_item_short_btn_delete" onClick={activeDeleteProduct}>DELETE</button>
      <Link className="admin_item_short_btn_change" to={`${url}/store/${item.link}`}>CHANGE</Link>
    </div>
  );
}

StoreItem.propTypes = {
  deleteProduct: PropTypes.func,
  item: PropTypes.shape({
    link: PropTypes.string,
    name: PropTypes.string,
    costPerItem: PropTypes.number,
    images: PropTypes.arrayOf( PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string
    }),)
  }),
  
};