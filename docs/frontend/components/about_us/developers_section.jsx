import React from 'react';

class DeveloperSection extends React.Component {
  render() {
    return (
      <section className="grid-items-2 max-width p-t-200 p-b-40" style={{marginBottom:'40px'}}>

              <div className="t-center" >
                  <div className="inline m-b-70 t-left">
                      <div className="line1 bg3 m-l-20- cu-tweenmax"
                          data-a-init="x:300, alpha:0, scaleX:1"
                          data-a-to="x:300, alpha:0.5, scaleX:50, ease:Expo.easeIn, duration:0.6"
                          data-a-to-2="x:0, alpha:1, scaleX:1, ease:Expo.easeOut, duration:1"
                      ></div>
                      <h2 className="color2 f-medium cu-tweenmax l-s-3"
                          data-a-init="alpha:0"
                          data-a-to="alpha:1, duration:0.9, delay:0.6, ease:Cubic.easeOut"
                      >The Talent</h2>
                  </div>
              </div>

          <div className="list inline-wrap now nowrap m-t-70-"
              data-flickity='{ "initialIndex": 0, "contain": true, "autoPlay":true, "prevNextButtons":false, "control":false, "pageDots":false, "wrapAround": false }'
          >
              <div className="item inline-element p-t-125 p-x-40" >
                  <div className="content box-shadow7">
                        <div className="image bg-cover" style={{ backgroundImage:"url(https://i.imgur.com/YJ0CLhQ.jpg)"}}></div>
                      <p className="t-18 f-bold wrap">Ozzy Paniagua | <span className="f-light italic">Designer at Adobe</span></p>
                      <p className="text wrap">Beautiful, complaint, fluid, usable and versatile theme, couldn't be happier and relax using Byond theme.</p>
                  </div>
              </div>
              <div className="item inline-element p-t-125 p-x-40" >
                  <div className="content box-shadow7">
                        <div className="image bg-cover" style={{ backgroundImage:"url(https://i.imgur.com/h8u751b.jpg)"}}></div>
                      <p className="t-18 f-bold wrap">Michael Valeriani | <span className="f-light italic">Developer at Google</span></p>
                      <p className="text wrap">WOW this is crazy, is insane have this high-quality Website on my hands at an affordable price, completely worth it, now my business looks like a huge company with this sleek User interface.</p>
                  </div>
              </div>
              {/* <div className="item inline-element p-t-125 p-x-40" >
                  <div className="content box-shadow7">
                      <div className="image bg-cover" style={{backgroundImage:"url(../../app/assets/images/testimonio1.jpg)"}}></div>
                      <p className="t-18 f-bold wrap">David Morgan | <span className="f-light italic">Designer at Adobe</span></p>
                      <p className="text wrap">Beautiful, complaint, fluid, usable and versatile theme, couldn't be happier and relax using Byond theme.</p>
                  </div>
              </div> */}
          </div>
            <div className="list inline-wrap now nowrap m-t-70-" style={{marginTop:'20px'}}
                data-flickity='{ "initialIndex": 0, "contain": true, "autoPlay":false, "prevNextButtons":false, "control":false, "pageDots":false, "wrapAround": false }'
            >
                <div className="item inline-element p-t-125 p-x-40" >
                    <div className="content box-shadow7">
                        <div className="image bg-cover" style={{ backgroundImage: "url(https://i.imgur.com/IStPhWy.jpg)" }}></div>
                        <p className="t-18 f-bold wrap">Tommy Pham | <span className="f-light italic">Designer at Adobe</span></p>
                        <p className="text wrap">Beautiful, complaint, fluid, usable and versatile theme, couldn't be happier and relax using Byond theme.</p>
                    </div>
                </div>
                <div className="item inline-element p-t-125 p-x-40" >
                    <div className="content box-shadow7">
                        <div className="image bg-cover" style={{ backgroundImage: "url(https://i.imgur.com/Y6KXrkt.jpg)" }}></div>
                        <p className="t-18 f-bold wrap">Travis Tillotson | <span className="f-light italic">Developer at Google</span></p>
                        <p className="text wrap">Travis is full-stack developer with experience in React, Redux, Ruby on Rails, Javascript and Python. With a background in psychology, he enjoys solving problems, understanding complex relationships and learning about technology.</p>
                    </div>
                </div>
                {/* <div className="item inline-element p-t-125 p-x-40" >
                  <div className="content box-shadow7">
                      <div className="image bg-cover" style={{backgroundImage:"url(../../app/assets/images/testimonio1.jpg)"}}></div>
                      <p className="t-18 f-bold wrap">David Morgan | <span className="f-light italic">Designer at Adobe</span></p>
                      <p className="text wrap">Beautiful, complaint, fluid, usable and versatile theme, couldn't be happier and relax using Byond theme.</p>
                  </div>
              </div> */}
            </div>
      </section>
    );
  }
}

export default DeveloperSection;
