import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { LINK_FOR_CREATE_PRODUCT } from '../../config';
import { getShortListProduct, deleteProduct } from '../../actions';

import StoreItem from './store_item';

class SearchForAdmin extends React.Component{
  constructor(props) {
    super(props);

    const { listProducts } = props.store;
    if(!listProducts.length) props.getShortListProduct();
  }

  render() {
    const { store:{ loading, listProducts }, deleteProduct } = this.props;
    
    return (
      <div className={`admin_search ${loading ? 'loading' : ''}`}>
        <div>
          <Link to={`store/${LINK_FOR_CREATE_PRODUCT}`} >
            <div className="admin_item_short_create">

              <button className="admin_item_short_btn_create">CREATE</button>
            </div>
          </Link>

          { listProducts.map(item => <StoreItem item={item} key={item.link} deleteProduct={deleteProduct} />) }
        </div>
      </div>
    );
  }
}

SearchForAdmin.propTypes = {
  getShortListProduct: PropTypes.func,
  deleteProduct: PropTypes.func,
  store: PropTypes.shape({
    listProducts: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
  })
};

const mapStateToProps = (state) => ({
  store: state.store,
});

const mapDispatchToProps = (dispatch) => ({
  getShortListProduct: () => dispatch(getShortListProduct()),
  deleteProduct: link => dispatch(deleteProduct(link)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForAdmin);