import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { storeItem } from '../../prop_type';
import ArrayCheckbox from './array_checkbox';

import { selectProductParameter } from '../../actions';

function StoreItem({ item, selectProductParameter }) {
  const { url } = useRouteMatch();
  const handleClick = e => e.preventDefault();

  return (
    <div className="store_item">
      <img src={item.images[0].url} alt={item.images[0].name} />
        <Link to={`${url}/${item.link}`}  className="store_item_description">
        <h3>{item.name}</h3>
        { item.colors && 
          <ArrayCheckbox
            array={ item.colors }
            onChangeSelectIndex={index => selectProductParameter(item.link, 'selectIndexColor', index)}
            selectIndex={item.selectIndexColor}
            type="colors"
          />
        }
        { item.sizes && 
          <ArrayCheckbox
            array={ item.sizes }
            onChangeSelectIndex= {index => selectProductParameter(item.link, 'selectIndexSize', index)}
            selectIndex={item.selectIndexSize}
            type="sizes"
          />
        }
        { item.costPerItem && <span className="cost_per_item">{item.costPerItem + ' $'}</span> }
        <button className="btn_add_to_cart" onClick={handleClick}>ADD TO CART</button>
      </Link>
    </div>
  );
}

StoreItem.propTypes = {
  item: storeItem,
  selectProductParameter: PropTypes.func,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  selectProductParameter: (link, parameter, index) => dispatch(selectProductParameter(link, parameter, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreItem);