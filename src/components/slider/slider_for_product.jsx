import React from 'react';
import PropTypes from 'prop-types';import Zoom from 'react-img-zoom';

class SliderForProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slidePosition: 0,
    };

    this.goTo = this.goTo.bind(this);
  }

  goTo(position) {
    event.preventDefault();
    const { images } = this.props;

    this.setState({
      slidePosition: position >= 0 ? 
                                    position < images.length ? position : 0
                                    : images.length - 1
    });
  }

  getElemImages() {
    const { images, height, width } = this.props;
    const { slidePosition } = this.state;

    return images.map((item, i) => {
      if(i ===  slidePosition) {
        return (
          <Zoom
            key={item.url}
            img={item.url} 
            title={item.name}
            zoomScale={2}
            width={width}
            height={height}
            style={{ opacity: i === slidePosition ? '1' : '0', display: i === slidePosition ? 'block' : 'none',}}
          />
        );
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.images.length !== this.props.images.length){
      this.setState({ slidePosition: this.props.images.length - 1 });
    }
    if(prevState.slidePosition !== this.state.slidePosition){
      this.props.getSlidePosition(this.state.slidePosition);
    }
  }

  render() { 
    const { className, images } = this.props;
    const { slidePosition } = this.state;

    const elemImages = this.getElemImages();

    if(images.length > 1) {
      return (
        <div className={className}>
          {elemImages}
          <button onClick={() => this.goTo(slidePosition - 1)}>❮</button>
          <button onClick={() => this.goTo(slidePosition + 1)}>❯</button>
        </div>
      );
    } else {
      return <div className={className}>{elemImages}</div>;
    }
      
  }
}

SliderForProduct.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
  })),
  setSlidePosition: PropTypes.number,
  getSlidePosition: PropTypes.func,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default SliderForProduct;
