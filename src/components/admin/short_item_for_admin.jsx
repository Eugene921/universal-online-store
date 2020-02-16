import React from 'react';
import {
  Link,
  useRouteMatch,
} from 'react-router-dom';

import PropTypes from 'prop-types';
// import { storeItem } from '../../prop_type';
// import { propTypes } from 'react-img-zoom';

export default function ItemShortForAdmin({ item }) {
  const { url } = useRouteMatch();

  return (
    <Link to={`${url}/${item.link}`}  style={{ textDecoration: 'none' }} >
      <div className="admin_item_short">
        { item.images ? 
                      <img src={item.images[0].url} alt={item.images[0].name} />
                      : <div className="admin_item_short_create"/> }
        <div className="admin_item_short_description">
          <h3>{item.name}</h3>
          <span>{item.costPerItem || ''}</span>
        </div>
      </div>
    </Link>
  );
}

ItemShortForAdmin.propTypes = {
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