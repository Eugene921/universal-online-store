import React from 'react';
import {
  Link,
  useRouteMatch,
} from 'react-router-dom';

import { storeItem } from '../../prop_type';

export default function ItemShortForAdmin({ item }) {
  const { url } = useRouteMatch();

  return (
    <Link to={`${url}/${item.link}`}  style={{ textDecoration: 'none' }}>
      <div className="admin_item_short">
        <img src={item.images[0].src} alt="" />
        <h3>{item.name}</h3>
        <span>{item.costPerItem}</span>
      </div>
    </Link>
  );
}

ItemShortForAdmin.propTypes = {
  item: storeItem,
};