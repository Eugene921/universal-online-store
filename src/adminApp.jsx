import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Admin from './components/admin/';
import AdminNavBar from './components/admin/admin_tools_bar';
import SearchForAdmin from './components/admin/search_for_admin';
import SotoreItemForAdmin from './components/admin/full_item/store_item_for_admin';

function AdminApp(props) {
  return(
    <main className="admin">
      <Switch>
        <Route exact path='/admin' component={Admin}/>
        <Route exact path='/admin/search' render={() =>  <SearchForAdmin {...props} />} />
        <Route path='/admin/search/:product' component={SotoreItemForAdmin}/>
      </Switch>
      <Route path='/admin' component={AdminNavBar}/>
    </main>
  );
}

export default AdminApp;