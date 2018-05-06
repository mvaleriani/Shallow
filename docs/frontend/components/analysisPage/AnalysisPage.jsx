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
    this.htmlVideo = document.createElement('video');
    this.loaded = true;
    this.croppedBlob = null;


    this.onDrop = this.onDrop.bind(this);
    this.setTimeToStart = this.setTimeToStart.bind(this);
    this.getCroppedFaces = this.getCroppedFaces.bind(this);
    this.videoSeekHandler = this.videoSeekHandler.bind(this);
    this.fromBlobToImg = this.fromBlobToImg.bind(this);
    this.initializeCanvas = this.initializeCanvas.bind(this);
    this.crop = this.crop.bind(this);
    this.blobSetter = this.blobSetter.bind(this);
    this.processCroppedImg = this.processCroppedImg.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.cropped.length);
    // We only want this to run once while the cropped is empty
    if (this.state.vidFile && this.state.cropped.length === 0) {
      // Why is this here? Why not formalize the looping process rather
      // than simply letting it do it's thing whenever the component
      // updates
      console.log("update");
      this.getCroppedFaces(this.state.vidFile); // the component gets update the show image at resets it back to 0
      // Also why are we calling it showImageAt, if all it does is start
      // the whole process. Can we find a more somantic name?
    }
  }

  getCroppedFaces(videoFile) {
    console.log("getCroppedFaces");
    // why are these being declared like this when no where else in the
    // codebase do we declare variables like this?
    this.htmlVideo.src = videoFile.preview;
    let video = this.htmlVideo;

    this.htmlVideo.addEventListener("loadedmetadata", this.setTimeToStart);
    // this.htmlVideo.onloadedmetadata = ;
    // this.setTimeToStart;
    console.log('after loaded meta data');

    // this.htmlVideo.onseeked = this.videoSeekHandler;
    this.htmlVideo.addEventListener('seeked', this.videoSeekHandler);
    console.log('after onseeked');
  }

  setTimeToStart() {
    console.log('setTimeToStart');
    // This will just set the time straight to 1 second in.
    this.htmlVideo.currentTime = 1;

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
    console.log('initializeCanvas');
    let canvas = document.createElement('canvas');
    // can we make this general use for images too?
    canvas.height = this.htmlVideo.videoHeight;
    canvas.width = this.htmlVideo.videoWidth;

    return canvas;
  }

  videoSeekHandler(e) {
    console.log('videoSeekHandler');
    //Initializes Canvas
    let canvas = this.initializeCanvas();
    var ctx = canvas.getContext('2d');

    while (this.state.cropped.length < 40 && this.loaded) {
      console.log("while loop");
      this.loaded = false;
      // Draw the image into a canvas, then pass it to the cropper;
      // Now is this actually redrawing the image? How can we test that?
      ctx.drawImage(this.htmlVideo, 0, 0, canvas.width, canvas.height);
      // We need to refactor this BAD, so many thing in here are off
      canvas.toBlob(this.fromBlobToImg, 'image/png');
    }
  }

  fromBlobToImg(blob) {
    console.log('fromBlobToImg');
    //This came here from videoSeekHandler, trying to see if we can keep the
    // reloadRandomFrame from activating until it's done.
    this.loaded = false;

    let img = new Image();
    img.height = this.htmlVideo.videoHeight;
    img.width = this.htmlVideo.videoWidth;
    img.src = URL.createObjectURL(blob);

    // Should we try anad go for seperation of concerns and have this simply
    // return an image to be then sent to this.crop?
    this.crop(img);
  }

  reloadRandomFrame() {
    console.log('reloadRandomFrame');
    // Do we need this loaded check here if the code that calls this
    // function is already checking for that?
    if (!isNaN(this.htmlVideo.duration) && this.loaded) {
      var rand = Math.round(Math.random() * this.htmlVideo.duration * 1000) + 1;
      this.htmlVideo.currentTime = rand / 1000;
    }
  }

  crop(img) {
    console.log('crop');
    // loads in the photo
    let imgCanvas = document.createElement('canvas');
    // These aren't setting the values
    imgCanvas.height = img.height;
    imgCanvas.width = img.width;

    let src = cv.imread(img);

    let dst = new cv.Mat();
    let rect = new cv.Rect(0, 0, 224, 224);
    // Applies the dimensions defined above to the image
    dst = src.roi(rect);

    // Applies cropped img to the canvas
    cv.imshow(imgCanvas, dst);

    imgCanvas.toBlob(this.blobSetter, 'image/png');
    src.delete();
    dst.delete();
    this.processCroppedImg();
  }

  blobSetter(blob) {
    //This blob isn't a proper blob!!!
    console.log('blobSetter');
    // this blob is used to create the croppedImg
    this.croppedBlob = URL.createObjectURL(blob);
    console.log('CroppedBlob: ', this.croppedBlob);
  }

  reader(image) {
    console.log('reader');
    // fairly certain this is due to async issues, this is basically a
    // promise
    return cv.imread(image);
  }

  processCroppedImg() {
    console.log('processCroppedImg');
    // console.log('croppedBlob: ', this.croppedBlob);
    let croppedImg = new Image();
    croppedImg.src = this.croppedBlob;
    // add the cropped photo, cleans up memory
    let newCropped = this.state.cropped.concat([croppedImg]); //keeping with never changing state directly
    this.loaded = true;
    this.reloadRandomFrame(); // this has been moved here from video seek handler
    this.setState({cropped: newCropped});
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
