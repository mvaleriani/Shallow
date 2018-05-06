import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import ImageCropper from './image_cropper';
import Dropzone from 'react-dropzone';

class AnalysisPage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      vidFile: null,
      vidPath: "",
      cropped: [],
      selectedCrops: []
    };

    this.currentTime = 0;
    this.currentBlob = null; //Because toBlob() expects a callback, this is necessary
    this.htmlVideo = null;
    this.loaded = true;


    this.setTimeToStart = this.setTimeToStart.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.getVideoImage = this.getVideoImage.bind(this);
    this.videoSeekHandler = this.videoSeekHandler.bind(this);
    this.fromBlobToImg = this.fromBlobToImg.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.vidFile && this.state.cropped.length < 40) {
      // Why is this here? Why not formalize the looping process rather
      // than simply letting it do it's thing whenever the component
      // updates
      console.log("update");
      this.getCroppedFaces(this.state.vidFile); // the component gets update the show image at resets it back to 0
      // Also why are we calling it showImageAt, if all it does is start
      // the whole process. Can we find a more somantic name?
    }
  }

  setTimeToStart() {
    // This will just set the time straight to zero.
    this.currentTime = 0;

    //This is just here for posterity, I'm not entirely sure why it was included
    /*
     Math.min(//This doesn't randomize the current time
                                 // it selects the minimum between two values
       Math.max(0, (secs < 0 ? this.duration : 0) + secs),// either 0 or (secs + duration : secs + 0)
       this.duration //and whatever the current duration is.
     );
    */
  }

  initializeCanvas() {
    let canvas = document.createElement('canvas');
    // can we make this general use for images too?
    canvas.height = this.htmlVideo.videoHeight;
    canvas.width = this.htmlVideo.videoWidth;

    return canvas;
  }

  videoSeekHandler(e) {
    //Initializes Canvas
    let canvas = this.initializeCanvas();
    var ctx = canvas.getContext('2d');

    while (this.state.cropped.length < 40) {
      if (this.loaded) {
        // Draw the image into a canvas, then pass it to the cropper;
        // Now is this actually redrawing the image? How can we test that?
        ctx.drawImage(this.htmlVideo, 0, 0, canvas.width, canvas.height);
        // We need to refactor this BAD, so many thing in here are off
        canvas.toBlob(this.fromBlobToImg, 'image/png');

        this.reloadRandomFrame();
      }
    }
  }

  fromBlobToImg(blob) {
    //This came here from videoSeekHandler, trying to see if we can keep the
    // reloadRandomFram from activating until it's done.
    this.loaded = false;

    let img = new Image();
    img.src = URL.createObjectURL(blob);

    this.crop(img);
  }

  getCroppedFaces(path) {
    // why are these being declared like this when no where else in the
    // codebase do we declare variables like this?
    this.htmlVideo.src = path;

    this.htmlVideo.onloadedmetadata = this.setTimeToStart;

    this.htmlVideo.onseeked = this.videoSeekHandler;
  }

  reloadRandomFrame() { //This is for the most part okay, but that's because you didn't write it
    if (!isNaN(this.htmlVideo.duration) && this.loaded) {
      var rand = Math.round(Math.random() * this.htmlVideo.duration * 1000) + 1;
      this.htmlVideo.currentTime = rand / 1000;
    }
  }
  // Crop has fucked canvas refrences, it should create it's own canvas to use
  crop(img) {
    //cv error: Index or size is negative or greater than the allowed amount, problem with imread()
      // loads in the photo
      function reader(image) { // Do we really need a function that returns another function
        return cv.imread(image); // Does this actually even call imread?
      }
      let src = reader(img);
      let dst = new cv.Mat(); // cv matrixes are werid
      // Crops the photo
      let rect = new cv.Rect(0, 0, 224, 224);
      dst = src.roi(rect);
      cv.imShow(canvas, dst); //Does this actually change the canvas to the new image
      // and if it does, will the rest of the video code still work?

      //I think this section of code is responsible for our bug, any video changes
      // won't change the canvas back.

      let croppedImg = new Image();
      canvas.getBlob(function (blob) {
        this.currentBlob = blob; // Why are we doing this ?!?!?!
        // Do we know if this croppedImg src is being saved properly?
        croppedImg.src = URL.createObjectURL(this.currentBlob); // it's being used right here!!!
      }.bind(this), 'image/png');

      // add the cropped photo, cleans up memory
      let newCropped = this.state.cropped.concat([croppedImg]); //keeping with never changing state directly
      this.loaded = true;
      this.setState({cropped: newCropped});
      src.delete();
      dst.delete();
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
        cropRow.push(
          <div className="croppedFrame" id={"frame_"+i}>
            <img src={this.state.cropped[i]}/>
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
