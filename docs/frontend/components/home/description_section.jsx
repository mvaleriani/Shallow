import React from 'react';

class DescriptionSection extends React.Component {

  render() {
    return (
      <section className="content-1 type2 flex max-width m-t-125 m-b-125 m-w p-x-20 cu-menu-anchor" >
        <div className="column column1 flex-box-50p bg8 p-x-100 p-t-200 p-b-175" >

          <div className="texts m-w-400 m-l-0">
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
              <p className="t-18 m-t-30 l-h-170">
                Shallow is a deep learning architecture designed to detect Deepfake video alterations.
                Created using only our data and the architecture of the VGG16 model, a deep-learning neural network specializing in classification, Shallow distinguishes between authentic and fake videos. 
              </p>
            </div>
          </div>

        </div>
        <div className="column column2 flex-grow" style={{marginLeft:'150px', marginTop:'100px'}}>
          <div className="image video cu-tweenmax"
            data-a-init='y:200, alpha:0'
            data-a-to='y:0, alpha:.7, duration:0.8'
            data-a-gap="100"
            >
            {/* <div className="bg-stretch cover" style={{backgroundImage:'url(../../app/assets/images/shadow.png)', marginLeft:'-160px', marginBottom:'-125px'}}></div> */}
            <img className="box-shadow7" src="https://raw.githubusercontent.com/mvaleriani/Shallow/master/docs/app/assets/images/heatmaps.png" style={{height: '600px'}}/>
            {/* <div className="bg-cover cover" style={{backgroundImage:'url(../../app/assets/images/heatmaps.png)'}}></div> */}
            {/* <div className="cover bg-black"></div> */}
            {/* <div className="video-play"> */}
              {/* <img className="svg" src="../../app/assets/images/video-play.svg" alt="" /> */}
            {/* </div> */}
          </div>
        </div>
      </section>
    );
  }
}

export default DescriptionSection;
