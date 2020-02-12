import React from 'react';

import CastomInput from './castom_input';
import CastomTextArea from './castom_textarea';
import SelectToArr from './select_to_arr';
import ImagesInput from './images_input';
import SliderForProduct from '../../slider/slider_for_product';

import PropTypes from 'prop-types';

import initState from '../../../initial_state';

import { storageRef } from '../../../base/base_auth';

class SotoreItemForAdmin extends React.Component {
  constructor(props) {
    super(props);
    const storeItemLink = props.match.params.product;
    const storeItem = initState.store.find(product => product.link === storeItemLink);

    this.state = {
      name: storeItem.name,
      images: storeItem.images,
      details: storeItem.details,
      sizes: storeItem.sizes,
      colors: storeItem.colors,
      costPerItem: storeItem.costPerItem,
      link: storeItem.link,
    };

    this.onAddSize = this.onAddSize.bind(this);
    this.checkValueSizes = this.checkValueSizes.bind(this);
    this.onAddColor = this.onAddColor.bind(this);
    this.checkValueColors = this.checkValueColors.bind(this);
    this.onAddImages = this.onAddImages.bind(this);
    this.checkValueImages = this.checkValueImages.bind(this);
    this.fileSelectedHendler = this.fileSelectedHendler.bind(this);
  }

  onAddSize(event) {
    event.preventDefault();
    const { sizes } = this.state;

    this.setState({
      sizes: [...sizes, ''],
    });
  }

  checkValueSizes(index) {
    const { sizes } = this.state;
    const { value } = event.target;

    if(value.length) {

      this.setState({
        sizes: sizes.map((size, i) => i === index ? value : size),
      });
    } else {  
       
      this.setState({
        sizes: sizes.filter((size, i) => i !== index),
      });
    }
  }

  onAddColor(event) {
    event.preventDefault();
    const { colors } = this.state;

    this.setState({
      colors: [...colors, ''],
    });
  }

  checkValueColors(indexUi) {
    const { colors } = this.state;
    const { value } = event.target;

    if(value.length) {

      this.setState({
        colors: colors.map((color, index) => index === indexUi ? value : color),
      });
    } else {  
       
      this.setState({
        colors: colors.filter((color, index) => index !== indexUi),
      });
    }
  }

  onAddImages(event) {
    event.preventDefault();
    const { images } = this.state;

    this.setState({
      images: [...images, { src: ''}],
    });
  }

  checkValueImages(index, newImage) {
    const { images } = this.state;

    if(newImage.src.length) {

      this.setState({
        images: images.map((image, i) => i === index ? newImage : image),
      });
    } else {  
       
      this.setState({
        images: images.filter((image, i) => i !== index),
      });
    }
  }

  // async 
  async fileSelectedHendler(e, index) {
    if(e.target.files[0] === undefined) return;

    const { images, link } = this.state;
    const blob = new Blob([e.target.files[0]],  { type: e.target.files[0].type });

    const imagesRef = storageRef.child(`images/${link}/${e.target.files[0].name}`);
    // console.log(`images/${link}/${e.target.files[0].name}`);
    
    await imagesRef.put(blob),
        console.log('Uploaded a blob or file!');

    this.setState({
      images: images.map((image, i) => i === index ? { src: URL.createObjectURL(blob) } : image),
    });
  }

  render(){
    const { link, name, details, costPerItem, sizes, colors, images } = this.state;
    
    return (
      <div>
        <form className="item_full_for_admin">
          <div className="item_full_images_for_admin">
            <ImagesInput
              name='Images'
              images={images}
              onAddItem={this.onAddImages}
              checkValue={this.checkValueImages}
              fileSelectedHendler={this.fileSelectedHendler}
            />
            <SliderForProduct
              images={images}
              className="slider_for_admin"
              width={window.innerWidth / 100 * 40 > 600 ? 400 : window.innerWidth / 100 * 40}
              height={window.innerHeight / 100 * 70}
            />
          </div>
          <div className="item_full_data_for_admin">
            <CastomInput name='Link' value={link} />
            <CastomInput name='Name' value={name} />
            <CastomTextArea name='Details' value={details} />
            <CastomInput name='Cost per item' value={costPerItem} />
            <SelectToArr name='Sizes' arr={sizes} onAddItem={this.onAddSize} checkValue={this.checkValueSizes} />
            <SelectToArr name='Colors' arr={colors} onAddItem={this.onAddColor} checkValue={this.checkValueColors} />
          </div>
        </form>
      </div>
    );
  }
}

SotoreItemForAdmin.propTypes = {
  match: PropTypes.any,
};

export default SotoreItemForAdmin;