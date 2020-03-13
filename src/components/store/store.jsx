import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StoreItem from './store_item';
import { getShortListProduct } from '../../actions';

class Store extends React.Component {
  constructor(props){
    super(props);
    const { listProducts, getShortListProduct } = this.props;

    if(!listProducts.length) getShortListProduct();
  }

  render() {
    const { listProducts, loading } = this.props;

    return (
      <div className={`store ${loading && 'loading'}`}>
        { listProducts.length ? listProducts.map(item => <StoreItem item={item} key={item.link} />) : 'Store is empty' }
      </div>
    );
  }
}
Store.propTypes = {
  listProducts: PropTypes.arrayOf(PropTypes.object),
  getShortListProduct: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = store => ({
  listProducts: store.store.listProducts,
  loading: store.store.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getShortListProduct: () => dispatch(getShortListProduct()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Store);