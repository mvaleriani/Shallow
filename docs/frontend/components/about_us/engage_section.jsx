import React from 'react';

class EngageSection extends React.Component {
  render() {
    return (
      <section className="content-1 type3 flex max-width m-t-125 m-w p-x-20 p-b-80 cu-menu-anchor" >
          <div className="column column1 bg8 p-t-150 p-b-80 p-l-70 p-r-100" >

                  <div className="texts m-w-500 m-l-0">
                      <div>
                          <div className="line1 bg3 m-l-5 m-b-10 cu-tweenmax"
                              data-a-init="x:300, alpha:0, scaleX:1"
                              data-a-to="x:300, alpha:0.5, scaleX:50, ease:Expo.easeIn, duration:0.6"
                              data-a-to-2="x:0, alpha:1, scaleX:1, ease:Expo.easeOut, duration:1"
                          ></div>
                      </div>
                      <div className="cu-tweenmax"
                          data-a-init="x:-50, alpha:0"
                          data-a-to="x:0, alpha:1, duration:0.9, delay:0.6, ease:Cubic.easeOut"
                      >
                          <h2 className="t-40 f-extra-light m-t25 l-h-100">Engage your clients to Byond</h2>
                          <p className="m-t-20 l-h-170">Byond theme is a beautiful and perfect theme that your business really needs</p>
                          <p className="f-bold t-18 m-t-20">We Help business </p>
                          <p className="m-t-20 l-h-170">We have worked pretty hard to give you a template able  to take your business beyond, 10 years of experience exploring the best practices of user experience and beautiful interfaces design reflected them in this template, the countdown has started for your launch, Go Byond</p>
                      </div>
                  </div>

          </div>
          <div className="column column2 flex-grow flex-align-center" >
              <div className="image bg-cover cu-tweenmax box-shadow7" style={{backgroundImage:"url(../../app/assets/images/p2-about9.jpg)"}}
                  data-a-init='y:200, alpha:0'
                  data-a-to='y:0, alpha:1, duration:0.8'
                  data-a-gap="100"
              ></div>
          </div>
      </section>
    );
  }
}

export default EngageSection;
