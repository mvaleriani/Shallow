import React from 'react';

class AboutHeader extends React.Component {
  render() {
    return (
        <section className="header-5 flex flex-align-center o-hidden p-x-20 min-h-350" data-cu-height="45%" style={{ backgroundImage:"url()"}}>
          <video className="video-bg" src="../../app/assets/videos/video2.mp4" autoPlay loop ></video>
            <img id="dev-cover" src="https://github.com/mvaleriani/Shallow/blob/master/docs/app/assets/images/MichaelCoding.png?raw=true" className="cover" />
          <div className="color7" >
              <div>
                  {/* <div className="line1 bg1 m-l-5 m-b-10 absolute cu-tweenmax"
                      data-a-init="x:300, alpha:0, scaleX:1"
                      data-a-to="x:300, alpha:0.5, scaleX:50, ease:Expo.easeIn, duration:0.6"
                      data-a-to-2="x:0, alpha:1, scaleX:1, ease:Expo.easeOut, duration:1"
                  ></div> */}
              </div>
              <h1 id="dev-title" className="f-extra-light t-60 l-h-100 t-center cu-tweenmax"
                  data-a-init="alpha:0"
                  data-a-to="alpha:1, duration:0.9, delay:0.6, ease:Cubic.easeOut"
              >Our Team Runs Deep</h1>

          </div>
      </section>
    );
  }
}

export default AboutHeader;
