import React from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

import Navigation  from './components/navigation/';
import Cart from './components/cart/cart';
import Footer from './components/footer/';
import Home from './components/home/home';

import Store from './components/store/';
import StoreItemFull from './components/store/full_item/store_item_full';

import Admin from './components/admin/';
import AdminNavBar from './components/admin/admin_tools_bar';
import LogInAdmin from './components/login/login';
import SearchForAdmin from './components/admin/search_for_admin';
import SotoreItemForAdmin from './components/admin/full_item/store_item_for_admin';

// import PrivateRoute from './route/private_route';
import { AuthProvider } from './auth/auth_admin';

// import initialState from '../../initial_state';


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route path="/" component={Navigation} />
          <main>
            <Route exact path="/" render={ props => <Home {...props} someText="Hello to my App!" />} />
            <Route path="/cart" component={Cart}/>

            <Route exact path='/store' component={Store}/>
            <Route path='/store/:product' component={StoreItemFull}/>

            <Route exact path="/login" component={LogInAdmin}/>

            <div className="admin">
              <Route exact path='/admin' component={Admin}/>
              <Route exact path='/admin/search' component={SearchForAdmin}/>
              <Route path='/admin/search/:product' component={SotoreItemForAdmin}/>
              <Route path='/admin' component={AdminNavBar}/>
            </div>

          </main>
        <Route path="/" component={Footer} />
      </BrowserRouter>
    </AuthProvider>
  );
}
