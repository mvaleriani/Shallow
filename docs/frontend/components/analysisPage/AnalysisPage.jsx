import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import ImageCropper from './image_cropper';
import Dropzone from 'react-dropzone';
import smartcrop from 'smartcrop';

class AnalysisPage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      vidFile: null,
      vidPath: "",
      cropped: [],
      selectedCrops: []
    };

    this.htmlVideo = document.createElement('video');
    this.loaded = true;
    this.croppedBlob = null;

    // The order of operations follows this order:
    this.onDrop = this.onDrop.bind(this);
    // componentDidUpdate will trigger after the drop method
    this.getCroppedFaces = this.getCroppedFaces.bind(this);
    this.setTimeToStart = this.setTimeToStart.bind(this);
    this.videoSeekHandler = this.videoSeekHandler.bind(this);
    this.initializeCanvas = this.initializeCanvas.bind(this);
    this.fromBlobToImg = this.fromBlobToImg.bind(this);
    this.crop = this.crop.bind(this);
    this.blobSetter = this.blobSetter.bind(this);
    this.processCroppedImg = this.processCroppedImg.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // We only want this to run once while the cropped is empty
    if (this.state.vidFile && this.state.cropped.length === 0) {
      this.getCroppedFaces(this.state.vidFile);
    }
  }

  getCroppedFaces(videoFile) {
    // The videoFile preview contains the blob for the video
    this.htmlVideo.src = videoFile.preview;

    // meta data is duration, width, and height all important attributes
    this.htmlVideo.addEventListener("loadedmetadata", this.setTimeToStart);

    // The previous method will trigger this method
    this.htmlVideo.addEventListener('seeked', this.videoSeekHandler);
  }

  setTimeToStart() {
    // This will just set the time straight to 1 second in, an arbitrary choice.
    this.htmlVideo.currentTime = 1;
  }

  initializeCanvas() {
    // Used to create the canvas in the videoSeekHandler method
    let canvas = document.createElement('canvas');
    // can we make this general use for images too?
    canvas.height = this.htmlVideo.videoHeight;
    canvas.width = this.htmlVideo.videoWidth;

    return canvas;
  }

  videoSeekHandler(e) {
    let canvas = this.initializeCanvas();
    var ctx = canvas.getContext('2d');

    // This is the semi-main event loop
    // Change the 5 back to 40
    while (this.state.cropped.length < 5 && this.loaded) {
      this.loaded = false;

      ctx.drawImage(this.htmlVideo, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(this.fromBlobToImg, 'image/png');
    }
  }

  fromBlobToImg(blob) {
    // These are here to act as a fail safe to keep the loop from spiralling
    // out of control
    this.loaded = false;

    let img = new Image();
    img.height = this.htmlVideo.videoHeight;
    img.width = this.htmlVideo.videoWidth;
    img.src = URL.createObjectURL(blob);

    img.onload = function() {
      this.crop(img);
    }.bind(this);
  }

  reloadRandomFrame() {
    if (!isNaN(this.htmlVideo.duration)) {
      var rand = Math.round(Math.random() * this.htmlVideo.duration * 1000) + 1;
      this.htmlVideo.currentTime = rand / 1000;
    }
  }

  crop(img) {
    // let imgData = imgCtx.getImageData(0, 0, width, height);
    //
    // let src = cv.matFromImageData(imgData);
    // let src = cv.imread(imgCanvas);
    // let dst = new cv.Mat();
    //
    // // The first two arguments can/are use to locate the face for some reason
    // let rect = new cv.Rect(100, 100, 224, 224);
    //
    // // The cv docs imply this is what does the locating but it doesn't
    // dst = src.roi(rect);
    // cv.imshow(imgCanvas, dst);

    //The critical error is spawning in this method
    let imgCanvas = document.createElement('canvas');
    let height = 224;
    let width = 224;

    imgCanvas.height = height;
    imgCanvas.width = width;

    let imgCtx = imgCanvas.getContext('2d');


    let cropOptions = {
      minScale: 1,
      height: 224,
      width: 224
    };

    smartcrop.crop(img, cropOptions).then(
      (result) => {
        // debugger;
        console.log("Result: ",result);
        imgCtx.drawImage(
          img,
          (result.topCrop.x + 224), // Source X
          (result.topCrop.y + 56), // Source Y
          224, // Width of subsection taken from image
          224, // Height of subsection taken from image
          0, // Destination X
          0, // Destination Y
          224,
          224
        );
        imgCanvas.toBlob(this.blobSetter, 'image/png');
      }
    );
  }

  blobSetter(blob) {
    console.log('blobSetter');
    this.croppedBlob = URL.createObjectURL(blob);
    console.log("croppedBlob: ", this.croppedBlob);
    this.processCroppedImg();
  }

  processCroppedImg() {
    let croppedImg = new Image(224, 224);
    croppedImg.src = this.croppedBlob;

    croppedImg.onload = function() {
      // keeping with never changing state directly we create a new array
      let newCropped = this.state.cropped.concat([croppedImg]);

      // This ensure the whole process can start again after we have
      // successfully completed the cropping process
      this.loaded = true;

      this.reloadRandomFrame();
      this.setState({cropped: newCropped});
    }.bind(this);
  }

  onDrop(acceptedFiles, rejectedFiles) {
      // let canvas = document.getElementById("blobify")
      // debugger;
      // let cropArr = []
      //
      // for (let i = 0; i < acceptedFiles.length; i++) {
      //   cropArr.push(acceptedFiles[i].preview)
      // }

      // this.setState({cropped: cropArr})
    if (acceptedFiles.length == 1 && acceptedFiles[0].type.split('/')[0]==='video') {
        this.setState({ vidFile: acceptedFiles[0], vidPath: URL.createObjectURL(acceptedFiles[0])})
    }
  }

  render(){
      let croppedArr = [];
      let cropRow = [];

      for (let i = 0; i < this.state.cropped.length; i++) {
        if ((i !== 0 && i%6 === 0)) {
          croppedArr.push(cropRow);
          cropRow = [];
        }
        // I added that little .src to the img tag so it works with my code
        // I'm pushing html img's directly in so you can probably use those
        // directly
        cropRow.push(
          <div className="croppedFrame" id={"frame_"+i}>
            <img src={this.state.cropped[i].src}/>
          </div>
        );
        if (i == this.state.cropped.length - 1 && i%6 !== 0) {
            croppedArr.push(cropRow);
        }
      }

      let flexCrop = [];
      for (let j = 0; j < croppedArr.length; j++) {
        flexCrop.push(<div id="cropRow">{croppedArr[j]}</div>)
      }

      return (
      <div>
          <section id="analysis-page" className=" h-80vh color7" style={{ zIndex: 2 }}>
          </section>

              <section className="content-1 type2 flex max-width m-t-125 m-b-125 m-w p-x-20 cu-menu-anchor" >
                  <div id="tool-div" className="column column1 flex-box-50p bg8 p-x-100 p-t-200 p-b-175" >
                      <section id="upload-menu">
                          <Dropzone onDrop={this.onDrop} id="file-catcher">
                  <img id="cloud" src="https://raw.githubusercontent.com/mvaleriani/Shallow/master/docs/app/assets/images/cloud-upload-1.png" />
                              <span className="up-span">Drag and Drop a File</span>
                              <span className="up-span">or Click Here</span>
                              <span id="upload-subtitle">To Begin Video Analysis</span>
                          </Dropzone>

                      </section>
                      {/* <canvas id="blobify"></canvas> */}
                      <div id="canvas-output">
                        {flexCrop}
                      </div>

                      {/* <div className="texts m-w-400 m-l-0">
                          <div>
                              <div className="line1 bg3 m-l-20- cu-tweenmax"
                                  data-a-init="x:300, alpha:0, scaleX:1"
                                  data-a-to="x:300, alpha:0.5, scaleX:50, ease:Expo.easeIn, duration:0.6"
                                  data-a-to-2="x:0, alpha:1, scaleX:1, ease:Expo.easeOut, duration:1"
                              ></div>

                              <h2 className="color2 f-medium cu-tweenmax"
                                  data-a-init="alpha:0"
                                  data-a-to="alpha:1, duration:0.9, delay:0.6, ease:Cubic.easeOut"
                              >What is Shallow?</h2>
                          </div>
                          <div className="cu-tweenmax"
                              data-a-init="x:-50, alpha:0"
                              data-a-to="x:0, alpha:1, duration:0.9, delay:0.6, ease:Cubic.easeOut"
                          >
                              <h3 className="t-60 f-extra-light l-h-normal m-t-25">Fighting AI with AI</h3>
                              <p className="t-18 m-t-30 l-h-170">Shallow is a deep learning architecture designed to detect Deepfake video alterations.</p>
                          </div>
                      </div> */}

                  </div>
                  {/* <div className="column column2 flex-grow" >
                      <div className="image video cu-tweenmax"
                      data-a-init='y:200, alpha:0'
                      data-a-to='y:0, alpha:1, duration:0.8'
                      data-a-gap="100"
                      >
                      <div className="bg-stretch cover" style={{ backgroundImage: 'url(../../app/assets/images/shadow.png)', marginLeft: '-160px', marginBottom: '-125px' }}></div>
                      <div className="bg-cover cover" style={{ backgroundImage: 'url(../../app/assets/images/p2-image2.jpg)' }}></div>
                      <div className="cover bg-black"></div>
                      <div className="video-play">
                      <img className="svg" src="../../app/assets/images/video-play.svg" alt="" />
                      </div>
                      </div>
                  </div> */}
              </section>
              {/* <ImageCropper /> */}
      </div>
      );
  }
}

export default AnalysisPage;
