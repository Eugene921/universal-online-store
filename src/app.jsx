import React from 'react';
// import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { getShortListProduct } from './actions';
import LogInAdmin from './components/login/login';

import StoreNavigation  from './components/navigation/store';
import AdminNavigation  from './components/navigation/admin';

import Cart from './components/cart/cart';
import Footer from './components/footer/';
import Home from './components/home/home';
import AdminApp from './adminApp';

import Store from './components/store/';
import StoreItemFull from './components/store/full_item/store_item_full';

function App() {

  return (
    <React.Fragment>
      <Route path={['/store', '/cart', '/login']} component={StoreNavigation} />
      <Route path="/admin" component={AdminNavigation} />
      <main>
        <Switch>
          <Route exact path="/" render={() => <Home someText="Hello to my App!" />} />
          <Route path="/cart" component={Cart}/>

          <Route exact path='/store' component={Store}/>
          <Route path='/store/:product' component={StoreItemFull}/>

          <Route path='/admin' component={AdminApp}/>

          <Route exact path="/login" component={LogInAdmin}/>
        </Switch>
      </main>
      <Route path={'/store', '/cart', '/login'} component={Footer} />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  listProducts: state.searchProductList.listProducts,
  loading: state.searchProductList.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getShortListProduct: () => dispatch(getShortListProduct())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
