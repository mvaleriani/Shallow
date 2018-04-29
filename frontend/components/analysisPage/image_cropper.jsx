import React from 'react';
// This code contains the end-user file picker and the image cropper
// It needs to grab video files for the user
// It needs to Slice the video into frames, then extract 10 frames from each quartile
// Crop each frame, before updating state with the cropped 40 frames
//This is where this component's role ends
// Have the user pick 20 frames that contain faces
// Pass the chosen to the model for evaluation
class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.imgElement = null;
    this.inputElement = null;
    this.mat = null;
    //the.path = null;
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

  getVideoImage(path, secs, callback) {
    var me = this, video = document.createElement('video');
    video.onloadedmetadata = function() {
      if ('function' === typeof secs) {
        secs = secs(this.duration);
      }
      this.currentTime = Math.min(Math.max(0, (secs < 0 ? this.duration : 0) + secs), this.duration);
    };
    video.onseeked = function(e) {
      var canvas = document.createElement('canvas');
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      var img = new Image();
      img.src = canvas.toDataURL();
      callback.call(me, img, this.currentTime, e);
    };
    video.onerror = function(e) {
      callback.call(me, undefined, undefined, e);
    };
    video.src = path;
  }

  showImageAt(secs) {
    var duration;
    this.getVideoImage(
      '/html/mov_bbb.mp4',
      function(totalTime) {
        duration = totalTime;
        return secs;
      },
      function(img, secs, event) {
        if (event.type == 'seeked') {
          var li = document.createElement('li');
          li.innerHTML += '<b>Frame at second ' + secs + ':</b><br />';
          li.appendChild(img);
          document.getElementById('olFrames').appendChild(li);
          if (duration >= ++secs) {
            this.showImageAt(secs);
          }
        }
      }
    );
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
