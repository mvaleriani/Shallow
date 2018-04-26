import React from 'react';

class NumbersSection extends React.Component {
  render() {
    return (
      <section className="content-6 type2 m-t-80 m-b-60">
          <div className="m-w flex">
              <div className="column column1 m-w-500 p-l-40 p-r-20">

                      <div className="texts">
                          <div>
                              <div className="line1 bg3 m-l-20- cu-tweenmax"
                                  data-a-init="x:300, alpha:0, scaleX:1"
                                  data-a-to="x:300, alpha:0.5, scaleX:50, ease:Expo.easeIn, duration:0.6"
                                  data-a-to-2="x:0, alpha:1, scaleX:1, ease:Expo.easeOut, duration:1"
                              ></div>
                              <h2 className="color2 f-medium l-s-3 cu-tweenmax"
                                  data-a-init="alpha:0"
                                  data-a-to="alpha:1, duration:0.9, delay:0.6, ease:Cubic.easeOut"
                              >Awards</h2>
                          </div>
                          <h3 className="t-60 f-extra-light m-t-30 l-h-normal cu-tweenmax"
                              data-a-init="x:-50, alpha:0"
                              data-a-to="x:0, alpha:1, duration:0.9, delay:0.6, ease:Cubic.easeOut"
                              style={{maxWidth:"444px"}}
                          >More than Numbers</h3>
                      </div>

              </div>
              <div className="column column2 flex flex-grow cu-tweenmax flex-align-center"
                  data-a-init="alpha:0"
                  data-a-to="alpha:1, duration:0.9, delay:0.6, ease:Cubic.easeOut"
              >
                  <div className="item not t-center">
                      <h4 className="f-bold t-18" >Notifications</h4>
                      <p className="number color2 f-light l-h-normal t-70 m-t-10 cu-tweenmax"
                          data-a-to='duration:4, ease:Circ.easeInOut, numberTo:238'
                          data-a-gap="200"
                      >0</p>
                  </div>
                  <div className="item not t-center">
                      <h4 className="f-bold t-18">Reach</h4>
                      <p className="number color2 f-light l-h-normal t-70 m-t-10 cu-tweenmax"
                          data-a-to='duration:4, ease:Circ.easeInOut, numberTo:895'
                          data-a-gap="200"
                      >0</p>
                  </div>
                  <div className="item not t-center">
                      <h4 className="f-bold t-18 ">Downloads</h4>
                      <p className="number color2 f-light l-h-normal t-70 m-t-10 cu-tweenmax"
                          data-a-to='duration:4, ease:Circ.easeInOut, numberTo:589'
                          data-a-gap="200"
                      >0</p>
                  </div>
              </div>
          </div>
      </section>
    );
  }
}

export default NumbersSection;
