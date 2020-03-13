import React from 'react';
import { Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import Crop from './crop';

const RenderField = ({ input, goToSlide, slidePosition, index, label, meta: { touched, error, warning }, ...props }) => {

  const borderColor = touched ? error ? '#ff2f2f94' : warning ? '#ff930087' : '' : '';
  
  const handleSubmit = (event) => {
    event.preventDefault();
    goToSlide(index);
  };

  return(
    <li onClick={handleSubmit}>
        { touched ? error ? <span className="input_err">{error}</span>
          : warning ? <span className="input_war">{warning}</span>
          : null : null}
      <Field
        {...props}
        component="input"
        type="text"
        name={`${input.name}.name`}
        placeholder={label}
        style={{ borderColor: slidePosition === index ? '#0000ff73' : borderColor}}
      />
      <Field name={`${name}.delete`} id={`btn_remove${index}`} style={{display: 'none'}} component="input" type="checkbox" />
      <label htmlFor={`btn_remove${index}`} title={`Remove ${label}`} className="btn_remove">⌫</label>
    </li>
  );
};

class RenderFieldImages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slidePosition: 0,
    };

    this.fileSelectedHendler = this.fileSelectedHendler.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
  }

  goToSlide(index, event) {
    if(index === -1) event.preventDefault();
    this.setState({ slidePosition: index });
  }

  fileSelectedHendler(image) {
    if(!image) return;
    const { fields, images } = this.props;
    
    fields.push({
      ...image,
      path: '',
      delete: false,
    });

    this.setState({ slidePosition: images.length || 0 });
  }

  render() {
    const { slidePosition } = this.state;
    const { fields, images, label, meta} = this.props;
    const { error, submitFailed, warning } = meta;
    console.log('RenderFieldImages -> render -> submitFailed', submitFailed);
    const activeImage = images[slidePosition] && !images[slidePosition].delete ? images[slidePosition].url : '';

    return (
      <React.Fragment>
        <ul className={`list_of_${fields.name}`}>

          { submitFailed && (error ? <li style={{ color: '#ff2f2f94', fontSize: '10px' }}>{error}</li> 
                      : warning && <li style={{ color: '#ff930087', fontSize: '10px' }}>{warning}</li>)}

          {fields.map((field, index) => {
            const disabled = fields.get(index).path !== '';
            
            if( fields.get(index).delete ) {
              return null;
            } else {
              return (
                <Field
                  key={index}
                  slidePosition={slidePosition}
                  name={field}
                  disabled={disabled}
                  goToSlide={this.goToSlide}
                  label={label}
                  index={index}
                  component={RenderField}
                />
              );
            }}
          )}
        </ul>
        <div className="crop_wrapper">
            <button onClick={event => this.goToSlide(-1, event)}>Add Image</button>
            { slidePosition === -1 && <Crop onSaveImage={this.fileSelectedHendler} /> }
        </div>
        <div className="image_wraper">
          <img src={activeImage} />
        </div>
      </React.Fragment>
    );
  }
}

RenderFieldImages.propTypes = {

};

const selector = formValueSelector('adminFormProduct');

const mapStateToProps = (state) => ({
  images: selector(state, 'images'),
});

export default connect(mapStateToProps, {})(RenderFieldImages);
