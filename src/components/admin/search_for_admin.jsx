import React from 'react';

import initState from '../../initial_state';

 import ItemShortForAdmin from './short_item_for_admin';

export default function SearchForAdmin() {
  return (
    <div className="admin_search">
      <div> 
        {
          initState.store.map(item => <ItemShortForAdmin item={item} key={item.link} />)
        }
      </div>
    </div>
  );
}