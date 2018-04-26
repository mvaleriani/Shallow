import React from 'react';

class SellingPointsSection extends React.Component {
  render() {
    return (
      <div>
        <section className="content-2 flex max-width m-t-70 m-w p-x-20" >
          <div className="column column1 flex-grow" >
            <div className="image bg-cover cu-tweenmax c-a-t-y box-shadow7" style={{backgroundImage:"url(../../app/assets/images/p2-image3.jpg)"}}
              data-a-init="alpha:0"
              data-a-to="alpha:1, delay:0.3, duration:1.5"
              data-a-gap="200"
              ></div>
          </div>
          <div className="column column2 flex-box-60p p-x-100 p-t-275 p-b-250" >
            <div className="cover bg1 cu-tweenmax" style={{marginRight:"-9999px"}}
              data-a-init="x:400, alpha:0"
              data-a-to="x:0, alpha:1, duration:0.7"
              data-a-gap="200"
              ></div>
            <div className="m-w-400">

              <div className="f-bold" >
                <div className="line1 m-l-30- bg3 cu-tweenmax"
                  data-a-init="x:300, alpha:0, scaleX:1"
                  data-a-to="x:300, alpha:0.5, scaleX:50, ease:Expo.easeIn, duration:0.6"
                  data-a-to-2="x:0, alpha:1, scaleX:1, ease:Expo.easeOut, duration:1"
                  ></div>
                <div className="cu-tweenmax"
                  data-a-init="alpha:0"
                  data-a-to="alpha:1, duration:0.9, delay:0.6, ease:Cubic.easeOut"
                  >
                  <div className="number t-30 f-light">1.</div>
                  <h3 className="t-18 color2 m-t-20">Best quality experience</h3>
                </div>
              </div>
              <p className="t-18 m-t-30 l-h-170" >Byond theme is a beautiful and perfect theme that your business really needs.</p>

            </div>
          </div>
        </section>

        <section className="content-10 flex">
            <div className="image cover bg-cover absolute cu-tweenmax" style={{backgroundImage:'url(../../app/assets/images/p2-image4.jpg)', left:'20%'}}
                data-a-init="alpha:0"
                data-a-to="alpha:1, delay:0.3, duration:1.5"
                data-a-gap="200"
            ></div>
            <div className="content m-w p-t-300 p-b-250 p-l-40 p-r-20">

                    <div className="texts m-w-400 m-l-0">
                        <div className="f-bold" >
                            <div className="line1 m-l-30- bg3 cu-tweenmax"
                                data-a-init="x:300, alpha:0, scaleX:1"
                                data-a-to="x:300, alpha:0.5, scaleX:50, ease:Expo.easeIn, duration:0.6"
                                data-a-to-2="x:0, alpha:1, scaleX:1, ease:Expo.easeOut, duration:1"
                            ></div>
                            <div className="cu-tweenmax"
                                data-a-init="alpha:0"
                                data-a-to="alpha:1, duration:0.9, delay:0.6, ease:Cubic.easeOut"
                            >
                                <div className="number t-30 f-light">2.</div>
                                <h3 className="t-18 color2 m-t-20 ">Stunning Functionality</h3>
                            </div>
                        </div>
                        <p className="t-18 m-t-30 l-h-170" >Byond theme is a beautiful and perfect theme that your business really needs.</p>
                    </div>

            </div>
        </section>

        <section className="content-4 app max-width m-w p-l-40 p-r-20 t-center" >
            <div className="cover bg bg1 cu-tweenmax" style={{marginRight:"-9999px"}}
                data-a-init="x:400, alpha:0"
                data-a-to="x:0, alpha:1, duration:0.7"
                data-a-gap="200"
            ></div>

                <div className="texts inline p-t-125 p-b-40 t-left">
                    <div className="f-bold" >
                        <div className="line1 m-l-30- bg3 cu-tweenmax"
                            data-a-init="x:300, alpha:0, scaleX:1"
                            data-a-to="x:300, alpha:0.5, scaleX:50, ease:Expo.easeIn, duration:0.6"
                            data-a-to-2="x:0, alpha:1, scaleX:1, ease:Expo.easeOut, duration:1"
                        ></div>
                        <div className="cu-tweenmax"
                            data-a-init="alpha:0"
                            data-a-to="alpha:1, duration:0.9, delay:0.6, ease:Cubic.easeOut"
                        >
                            <div className="number t-30 f-light">3.</div>
                            <h3 className="t-18 color2 m-t-20">Your business goals Satisfied</h3>
                        </div>
                    </div>
                    <p className="t-18 m-t-30 l-h-170" >Byond theme is a beautiful and perfect theme that your business really needs.</p>
                </div>

            <div className="image m-b-10- cu-tweenmax o-hidden"
                data-a-init="y:200, alpha:0, zIndex:auto"
                data-a-to="y:0, alpha:1, delay:0.3, duration:0.7"
                data-a-gap="100"
            >
                <img src="../../app/assets/images/p2-image5.png" className="m-w-1000" alt="" />
            </div>
        </section>
      </div>
    );
  }
}

export default SellingPointsSection;
