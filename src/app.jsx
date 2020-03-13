import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import PrivatRoute from './route/private_route';
import { getCurrentUser } from './actions';

import LogInAdmin from './components/login/login';
import Navigation  from './components/navigation';


import Cart from './components/cart/cart';
import Footer from './components/footer/';
import Home from './components/home/home';
import User from './components/user/user';

import AdminDoc from './components/admin/doc';
import StoreForAdmin from './components/admin/store';
import ProductForAdmin from './components/admin/product/product';


import Store from './components/store/store';
import Product from './components/store/product/product';
import ResponseStateBar from './components/navigation/response_state_bar';

//export default
class App extends React.Component {
  constructor(props) {
    super(props);

    this.getCurentUser();
  }

  async getCurentUser() {
    this.props.getCurrentUser();
  }
  
  render() {

    return (
      <React.Fragment>
        <ResponseStateBar />
        <Route path="/" component={Navigation} />
        <main >
          <Switch>
            <Route exact path="/"         render={() => <Home someText="Hello to my App!" />} />
            <Route path="/cart"           component={Cart}/>

            <Route exact path='/store'    component={Store}/>
            <Route path='/store/:productLink' component={Product}/>

            <PrivatRoute exact path='/user'    component={User}/>
            <Route path='/admin' component={ () => (
              <div className="admin">
                <Switch>
                  <PrivatRoute exact path='/admin' component={AdminDoc}/>
                  <PrivatRoute exact path='/admin/store' component={StoreForAdmin}/>
                  <PrivatRoute path='/admin/store/:productLink' component={ProductForAdmin} />
                </Switch>
              </div>
            )}/>

            <Route exact path="/login"    component={LogInAdmin}/>
          </Switch>
        </main>
        <Route path="/" component={Footer} />
      </React.Fragment>
    );
  }
}

App.propTypes = {
  getCurrentUser: PropTypes.func,
  setShowUserBar: PropTypes.func,
  showUserBar: PropTypes.bool,
};


const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
