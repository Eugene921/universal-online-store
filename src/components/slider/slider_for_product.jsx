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
      slidePosition: position > 0 ? 
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
            key={item.src}
            img={item.src} 
            zoomScale={2}
            width={width}
            height={height}
            style={{ opacity: i === slidePosition ? '1' : '0', display: i === slidePosition ? 'block' : 'none',}}
          />
        );
      }
    });
  }

  render() { 
    const { className } = this.props;
    const { slidePosition } = this.state;

    const elemImages = this.getElemImages();

    return (
      <div className={className}>
        {elemImages}
        <button onClick={() => this.goTo(slidePosition - 1)}>❮</button>
        <button onClick={() => this.goTo(slidePosition + 1)}>❯</button>
      </div>
    );
  }
}

SliderForProduct.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })),
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default SliderForProduct;
