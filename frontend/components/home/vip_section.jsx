import React from 'react';

class VIPSection extends React.Component {
  render() {
    return (
      <section className="content-5 app" >
          <div className="cover bg-cover parallax-bg" style={{backgroundImage:"url(../../app/assets/images/p2-image6.jpg)"}} ></div>
          <div className="cover" style={{background:"rgba(33,45,62,0.9)"}}></div>
          <div className="m-w flex">
              <div className="column column1 flex-grow">
                  <div className="image1 bg-cover c-a-t-y m-t-60-" style={{backgroundImage:"url(../../app/assets/images/p2-image7.jpg)"}} ></div>
              </div>
              <div className="column column2 flex p-y-350" style={{width:"550px"}}>

                      <div className="texts m-w-400 m-l-0 color7" >
                          <div>
                              <div className="line1 bg1 m-l-20- cu-tweenmax"
                                  data-a-init="x:300, alpha:0, scaleX:1"
                                  data-a-to="x:300, alpha:0.5, scaleX:50, ease:Expo.easeIn, duration:0.6"
                                  data-a-to-2="x:0, alpha:1, scaleX:1, ease:Expo.easeOut, duration:1"
                              ></div>
                              <h2 className="f-medium cu-tweenmax l-s-3"
                                  data-a-init="alpha:0"
                                  data-a-to="alpha:1, duration:0.9, delay:0.6, ease:Cubic.easeOut"
                              >VIP Featured</h2>
                          </div>
                          <div className="cu-tweenmax"
                              data-a-init="y:50, alpha:0"
                              data-a-to="y:0, alpha:1, duration:0.9, delay:0.6, ease:Cubic.easeOut"
                          >
                              <h3 className="t-60 f-extra-light l-h-normal m-t-30">Let’s rock your App with Byond</h3>
                              <p className="t-18 m-t-30 l-h-170">Byond theme is a beautiful and perfect theme that your business really needs.</p>
                          </div>
                      </div>

              </div>
              <img className="image2 cu-tweenmax a-r-b m-b-150-" src="../../app/assets/images/p1-image7.png" alt=""
                  data-a-init="alpha:0, y:150"
                  data-a-to="alpha:1, y:0, delay:0.2, ease:Cubic.easeOut, duration:1"
                  data-a-gap="-100"
              />
          </div>
      </section>
    );
  }
}

export default VIPSection;
