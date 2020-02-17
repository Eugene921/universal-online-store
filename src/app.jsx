import React from 'react';
// import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import * as action from './actions';

import LogInAdmin from './components/login/login';

import StoreNavigation  from './components/navigation/store';
import AdminNavigation  from './components/navigation/admin';


import Cart from './components/cart/cart';
import Footer from './components/footer/';
import Home from './components/home/home';

import Admin from './components/admin/';
import AdminNavBar from './components/admin/admin_tools_bar';
import SearchForAdmin from './components/admin/search_for_admin';
import SotoreItemForAdmin from './components/admin/full_item/store_item_for_admin';


import Store from './components/store/';
import StoreItemFull from './components/store/full_item/store_item_full';

function App(props) {
  console.log(props);

  return (
    <React.Fragment>
      <Route path={['/store', '/cart', '/login']} component={StoreNavigation} />
      <Route path="/admin"                        component={AdminNavigation} />
      <main>
        <Switch>
          <Route exact path="/"         render={() => <Home someText="Hello to my App!" />} />
          <Route path="/cart"           component={Cart}/>

          <Route exact path='/store'    component={Store}/>
          <Route path='/store/:product' component={StoreItemFull}/>

          <Route path='/admin'>
            <div className="admin">
                <Switch>
                  <Route exact path='/admin'>           <Admin/>                             </Route>
                  <Route exact path='/admin/search'>    <SearchForAdmin {...props} />        </Route>
                  <Route path='/admin/search/:productLink'> <SotoreItemForAdmin { ...props } />  </Route>
                </Switch>

                <Route path='/'>                    <AdminNavBar {...props}/>           </Route>
            </div>
          </Route>

          <Route exact path="/login"    component={LogInAdmin}/>
        </Switch>
      </main>
      <Route path={'/store', '/cart', '/login'} component={Footer} />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  searchProductList: state.searchProductList,
  itemProduct: state.itemProduct,
});

const mapDispatchToProps = (dispatch) => ({
  getItemProduct: productLink => dispatch(action.getItemProduct(productLink)),
  getShortListProduct: () => dispatch(action.getShortListProduct())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
