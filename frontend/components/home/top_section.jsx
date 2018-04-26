import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class TopSection extends React.Component {
  render() {
    return (
      <section className="header-2 h-80vh color7" style={{zIndex:2}}>
        <div className="cover bg-cover parallax-bg"  >
          <canvas id='c'></canvas>
        </div>
        <div className="cover" style={{background:'rgba(22,23,30,0.2)'}}></div>
        <div className="content flex flex-cover flex-row">
          <div className="column1 flex-grow m-r-50">


            <img className="a-r-b m-b-200- cu-tweenmax" src="../../app/assets/images/p2-image1.png" alt=""
              data-a-init="y:300, alpha:0"
              data-a-to="y:0, alpha:1, ease:Expo.easeOut, duration:1"
              />
          </div>
          <div className="column2 flex flex-grow flex-justify-start flex-align-center m-l-50">

            <div className="contents m-t-100">
              <div>
                <div className="line1 bg1 m-l-5 cu-tweenmax"
                  data-a-init="x:300, alpha:0, scaleX:1"
                  data-a-to="x:300, alpha:0.5, scaleX:50, ease:Expo.easeIn, duration:0.6"
                  data-a-to-2="x:0, alpha:1, scaleX:1, ease:Expo.easeOut, duration:1"
                  ></div>
              </div>
              <div className="m-w-400 m-l-0 cu-tweenmax"
                data-a-init="x:-50, alpha:0"
                data-a-to="x:0, alpha:1, duration:0.9, delay:0.7, ease:Cubic.easeOut"
                >

                <h1 className="t-60 f-extra-light m-t-25 l-h-110">The Theme that your App Deserve</h1>

                <p className="t-16 m-t-30">Navigate through it and check it out</p>

                <div>
                  <p className="f-bold m-t-40 m-b-10">Download the app</p>
                  <a className="button-style3 bg6 m-r-20">
                    <div className="bg cover ease-cubicInOut"></div>
                    <span><i className="fa fa-apple m-0 p-0" aria-hidden="true"></i></span>
                  </a>
                  <a className="button-style3 bg6">
                    <div className="bg cover ease-cubicInOut"></div>
                    <span><i className="fa fa-android m-0 p-0" aria-hidden="true"></i></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default TopSection;
