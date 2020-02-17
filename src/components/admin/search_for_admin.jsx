import React from 'react';
import PropTypes from 'prop-types';

import ItemShortForAdmin from './short_item_for_admin';

export default class SearchForAdmin extends React.Component{
  constructor(props) {
    super(props);

    this.props.getShortListProduct();
  }

  render() {
    const { loading, listProducts } = this.props.searchProductList;
    
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
  searchProductList: PropTypes.shape({
    listProducts: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
  })
};