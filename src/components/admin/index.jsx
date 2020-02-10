import React from 'react';
import firebaseApp from '../../base/base_auth';

import initialState from '../../initial_state';
import ItemForAdmin from './item_for_admin';

export default function Admin() {
  const listAdmin = (() => initialState.store.map(item => <ItemForAdmin key={item.link} item={item}/>))();

  return (
      <div className="admin">

        <div className="admin_change_product">
          {listAdmin}
        </div>

        <div className="admin_tools">
          <h1>Welcome to My Awesome App - Admin</h1>
          <button onClick={() => firebaseApp.auth().signOut()}>Sing Out</button>
        </div>
      </div>
  );
}