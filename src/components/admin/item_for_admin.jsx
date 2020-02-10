import React from 'react';
import PropTypes from 'prop-types';

import CastomInput from './castom_input';
import CastomTextArea from './castom_textarea';
import SelectToArr from './select_to_arr';
import ArrFileInput from './arr_file_input';
import SliderForProduct from '../slider/slider_for_product';


class ItemForAdmin extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
      name: props.item.name || '',
      images: props.item.images || [],
      details: props.item.details || '',
      sizes: props.item.sizes || [],
      colors: props.item.colors || [],
      costPerItem: props.item.costPerItem || 0,
      link: props.item.link|| '',
      imageSlidePosition: 1,
    };

    this.onAddSize = this.onAddSize.bind(this);
    this.checkValueSizes = this.checkValueSizes.bind(this);
    this.onAddColor = this.onAddColor.bind(this);
    this.checkValueColors = this.checkValueColors.bind(this);
    this.onAddImages = this.onAddImages.bind(this);
    this.checkValueImages = this.checkValueImages.bind(this);
    this.fileSelectedHendler = this.fileSelectedHendler.bind(this);
  }

  goTo(position) {
    const { images } = this.state;

    this.setState({
      imageSlidePosition: position > 0 ? 
                            position < images.length ? position : 0
                            : images.length - 1
    });
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
      images: [...images, ''],
    });
  }

  checkValueImages(index) {
    const { images } = this.state;
    const { value } = event.target;

    if(value.length) {

      this.setState({
        images: images.map((image, i) => i === index ? value : image),
      });
    } else {  
       
      this.setState({
        images: images.filter((image, i) => i !== index),
      });
    }
  }

  fileSelectedHendler(e) {
    console.log(e.target.files[0]);
  }

  render(){
    const { link, name, details, costPerItem, sizes, colors, images, imageSlidePosition } = this.state;
    
    return (
      <div>
        <form className="item_full_for_admin">
          <div className="item_full_images_for_admin">
            <ArrFileInput
              name='Images'
              arr={images}
              onAddItem={this.onAddImages}
              checkValue={this.checkValueImages}
              fileSelectedHendler={this.fileSelectedHendler}
            />
            <SliderForProduct
              slidePosition={imageSlidePosition}
              goToPre={() => this.goTo(imageSlidePosition - 1)}
              goToNext={() => this.goTo(imageSlidePosition + 1)}
              arrImages={images}
              classNameValue="slider_for_admin"
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

ItemForAdmin.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    details: PropTypes.string,
    sizes: PropTypes.arrayOf(PropTypes.string),
    colors: PropTypes.arrayOf(PropTypes.string),
    costPerItem: PropTypes.number,
    link: PropTypes.string,
    fontSize: PropTypes.number
  }),
};

export default ItemForAdmin;