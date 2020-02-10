import React from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

import Navigation  from './components/navigation/';
import Cart from './components/cart/cart';
import Footer from './components/footer/';
import Home from './components/home/home';
import AppStore from './components/store/';

import Admin from './components/admin/';
import LogInAdmin from './components/admin/login';

// import PrivateRoute from './route/private_route';
import { AuthProvider } from './auth/auth_admin';


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route path="/" component={Navigation} />
          <main>
            <Route exact path="/" component={Home} />
            <Route path="/store" component={AppStore}/>
            <Route path="/cart" component={Cart}/>
            <Route exact path="/admin" component={Admin}/>
            <Route exact path="/admin/login" component={LogInAdmin}/>
          </main>
        <Route path="/" component={Footer} />
      </BrowserRouter>
    </AuthProvider>
  );
}
