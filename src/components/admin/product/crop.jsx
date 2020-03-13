import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import PropTypes from 'prop-types';
import 'react-image-crop/dist/ReactCrop.css';

export default class Crop extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      initImage: null,
      croppedImage: null,
      crop: {
        unit: '%',
        width: 50,
        aspect: 3 / 4,
      },
      name: '',
      type: '',
    };

    this.onSelectFile = this.onSelectFile.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onCropChange = this.onCropChange.bind(this);
    this.getCroppedImg = this.getCroppedImg.bind(this);
    this.makeClientCrop = this.makeClientCrop.bind(this);
    this.returnInitImage = this.returnInitImage.bind(this);
  }

  async onSelectFile (e) {
    if (e.target.files && e.target.files.length > 0) {
      
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({
          initImage: reader.result,
        })
      );
      reader.readAsDataURL(e.target.files[0]);
      this.setState({ name: e.target.files[0].name, type: e.target.files[0].type });
    }
  }

  returnInitImage() {
    event.preventDefault();
    this.setState({ croppedImage: null });
  }
  // If you setState the crop in here you should return false.
  onImageLoaded (image) {
    this.imageRef = image;
  }

  onCropChange (crop) {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  }

  async makeClientCrop() {
    event.preventDefault();

    const { crop } = this.state;
    if (this.imageRef && crop.width && crop.height) {
      const croppedImage = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImage, crop: { aspect: 3 / 4, } });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  render() {
    const { onSaveImage } = this.props;
    const { crop, croppedImage, initImage, name, type } = this.state;

    const activeSaveImage = () => {
      event.preventDefault();
      console.log({url: croppedImage, name, type });
      
      onSaveImage && onSaveImage({url: croppedImage, name, type });
      this.setState({
        initImage: null,
        croppedImage: null,
        name: '',
        type: '',
      });
    };
    return (
      <div className="App">
        <div>
          <input type="file" accept="image/*" onChange={this.onSelectFile} />
        </div>
        {initImage && (
          <React.Fragment>
            <div>
              <button onClick={this.makeClientCrop} disabled={!crop.width && !crop.height} >Make Crop</button>
              <button onClick={this.returnInitImage} disabled={!croppedImage}>Return Init Image</button>
              <button onClick={activeSaveImage} disabled={!croppedImage} className="btn_save_crop">Save</button>
            </div>
            <ReactCrop
              src={croppedImage ? croppedImage : initImage}
              crop={crop}
              ruleOfThirds
              onImageLoaded={this.onImageLoaded}
              onChange={this.onCropChange}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}


Crop.propTypes = {
  onSaveImage: PropTypes.func
};
