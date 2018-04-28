import React from 'react';

class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.imgElement = null;
    this.inputElement = null;
    this.mat = null;
    this.createSrc = this.createSrc.bind(this);
    this.crop = this.crop.bind(this);
  }
  componentDidMount() {
    this.imgElement = document.getElementById('imageSrc');
    this.inputElement = document.getElementById('fileInput');
    window.onload = this.onOpenCvReady;
    this.inputElement.addEventListener('change', this.createSrc);
    this.imgElement.onload = this.renderImg;
  }

  componentWillUnmount() {
    this.mat.delete();
  }

  onOpenCvReady() {
    document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
  }

  createSrc(e) {
    this.imgElement.src = URL.createObjectURL(e.target.files[0]);
  }

  renderImg() {
    this.mat = cv.imread(this.imgElement);
    cv.imshow('canvasOutput', this.mat);
  }

  crop() {
    let src = cv.imread(this.imgElement);
    let dst = new cv.Mat();
    // You can try more different parameters
    let rect = new cv.Rect(0, 0, 224, 224);
    dst = src.roi(rect);
    cv.imshow('canvasOutput', dst);
    src.delete();
    dst.delete();
  }

  render() {
    return (
      <div>
        <p id='status'>OpenCV is loading...</p>
        <div>
          <div className="inputoutput">
            <img id="imageSrc" alt="No Image" />
            <div className="caption">imageSrc <input type="file" id="fileInput" name="file" /></div>
          </div>
          <div className="inputoutput">
            <canvas id="canvasOutput" ></canvas>
            <div className="caption">canvasOutput</div>
          </div>
          <button onClick={this.crop}>Crop!</button>
        </div>
      </div>
    );
  }
}

export default ImageCropper;
