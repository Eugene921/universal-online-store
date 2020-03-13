import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signOutCurrentUser } from '../../actions';

import cartSVG from '../../../public/images/cart.svg';

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cart" onMouseLeave={this.closse}>
        <Link className="icon" to="/cart" onClick={this.closse} ><img src={cartSVG}/></Link>
      </div>
    );
  }
}


Cart.propTypes = {
  currentUser: PropTypes.shape({
    image: PropTypes.string,
    email: PropTypes.string,
  }),
  isAdmin: PropTypes.bool,
  signOutCurrentUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAdmin: state.user.isAdmin,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutCurrentUser: () => dispatch(signOutCurrentUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);