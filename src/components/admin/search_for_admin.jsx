import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getShortListProduct } from '../../actions/';

import ItemShortForAdmin from './short_item_for_admin';

class SearchForAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.props.getShortListProduct();
  }

  render() {
    const { listProducts, loading } = this.props;
    
    return (
      <div className={`admin_search ${loading ? 'loading' : ''}`}>
        <div>
          <ItemShortForAdmin item={{ name: '', link: 'create-new-product' }} />
          { listProducts.map(item => <ItemShortForAdmin item={item} key={item.link} />) }
        </div>
      </div>
    );
  }
}

SearchForAdmin.propTypes = {
  getShortListProduct: PropTypes.func,
  listProducts: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  listProducts: state.searchProductList.listProducts,
  loading: state.searchProductList.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getShortListProduct: () => dispatch(getShortListProduct())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForAdmin);