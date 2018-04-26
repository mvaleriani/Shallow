import React from 'react';

class GridSection extends React.Component {
  render() {

    return (
      <section className="grid-items-1 flex max-width m-y-60">

              <div className="item cu-tweenmax"
                  data-a-init="alpha:0"
                  data-a-to="alpha:1, duration:0.8"
                  data-a-gap="200"
                  >
                  <div className="content">
                      <div id="keras-icon" className="icon-ball m-b-40 ">
                          <img id="keras-img" src="../../app/assets/images/kerasIcon.jpg" alt="" />
                      </div>
                      <h2 className="t-18 f-bold">Keras</h2>
                      <p className="m-t-20" >Byond theme is a beautiful and perfect theme that your business really needs</p>
                  </div>
              </div>

              <div className="item cu-tweenmax"
                  data-a-init="alpha:0"
                  data-a-to="alpha:1, delay:0.2, duration:0.8"
                  data-a-gap="200"
                  >
                  <div className="content">
                      <div id="tensorflow-icon" className="icon-ball m-b-40 ">
                          <img id="tensorflow-img" src="../../app/assets/images/tensorflowIcon.png" alt="" />
                      </div>
                      <h2 className="t-18 f-bold">Tensorflow</h2>
                      <p style={{marginTop:'20px'}}>Byond theme is a beautiful and perfect theme that your business really needs vitia malo quam malitias nominare</p>
                  </div>
              </div>

              <div className="item cu-tweenmax"
                  data-a-init="alpha:0"
                  data-a-to="alpha:1, delay:0.4, duration:0.8"
                  data-a-gap="200"
                  >
                  <div className="content">
                      <div id="react-icon" className="icon-ball m-b-40 ">
                          <img id="react-img" src="../../app/assets/images/reactIcon.png" alt="" />
                      </div>
                      <h2 className="t-18 f-bold ">React</h2>
                      <p style={{marginTop:'20px'}}>Byond theme is a beautiful and perfect theme that your business really needs</p>
                  </div>
              </div>

      </section>
    );
  }
}

export default GridSection;
