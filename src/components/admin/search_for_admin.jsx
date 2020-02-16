import React from 'react';

// import initState from '../../initial_state';

import ItemShortForAdmin from './short_item_for_admin';

import { getShortItemsProduct } from '../../base/base_product';

class SearchForAdmin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listProduct: [],
    };
    this.getListProducrt();
  }

  async getListProducrt() {
    const listProduct = await getShortItemsProduct();

    this.setState({ listProduct: listProduct });
  }

  render() {
    const { listProduct } = this.state;
    console.log(listProduct);

    return (
      <div className="admin_search">
        <div>
          <ItemShortForAdmin item={{ name: '', link: 'create-new-product' }} />
          { listProduct.map(item => <ItemShortForAdmin item={item} key={item.link} />) }
        </div>
      </div>
    );
  }
}

// { listProduct.map(item => <ItemShortForAdmin item={item} key={item.link} />) }
export default SearchForAdmin;