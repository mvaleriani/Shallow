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

          <div className="" style={{display: 'flex', justifyContent: "space-around", width: "100%"}}
            //   data-flickity='{ "initialIndex": 0, "contain": true, "autoPlay":false, "prevNextButtons":false, "control":false, "pageDots":false, "wrapAround": false }'
          >
              <div className="item inline-element p-t-125 p-x-40" style={{marginRight: "40px"}} >
                  <div className="content box-shadow7">
                        <div className="image bg-cover" style={{ backgroundImage:"url(https://i.imgur.com/YJ0CLhQ.jpg)"}}></div>
                        <p className="t-18 f-bold wrap">Ozzy Paniagua | <span className="f-light italic">Software Engineer</span></p>
                      <p className="text wrap">Ozzy is someone with a deep appreciation for the process of learning. The drive to expand his horizons have pushed him into the ever adapting field of web development. This path lead him to learning JavaScript, Ruby, HTML and CSS, but to go above and beyond that was his main goal. Towards that goal, he has begun to practice Python and Machine Learning, a deep field, rich with unexplored potential. But no great endeavour was completed alone, and Ozzy thrives when working with others in a collaborative setting, having prior education in Management he knows, the true strength of any developer is only revealed when surrounded by similarly motivated individuals.</p>
                  </div>
              </div>
              <div className="item inline-element p-t-125 p-x-40" >
                  <div className="content box-shadow7">
                        <div className="image bg-cover" style={{ backgroundImage:"url(https://i.imgur.com/h8u751b.jpg)"}}></div>
                        <p className="t-18 f-bold wrap">Michael Valeriani | <span className="f-light italic">Software Engineer</span></p>
                        <p className="text wrap" >Michael is a self-driven, lifelong learner with a passion for logic and discrete systems. He believes the best solutions are ones that are both efficient and optimized for the user’s experience. At the end of the day it’s people who interact with code, whether it be the consumer or another developer. After being fascinated by Machine Learning for years Michael stepped into the field after learning of <a href="https://en.wikipedia.org/wiki/Deepfake" style={{ color: "#199B99", textDecoration: "underline" }}>Deepfake</a>. He recognized that for AI to make a positive impact on society it would need to focus more on Ethics. With that in mind he formed a team of developers and dove into the project now known as Shallow.</p>
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

            >
            <a href=""></a>
                <div className="item inline-element p-t-125 p-x-40" >
                    <div className="content box-shadow7">
                        <div className="image bg-cover" style={{ backgroundImage: "url(https://i.imgur.com/IStPhWy.jpg)" }}></div>
                        <p className="t-18 f-bold wrap">Tommy Pham | <span className="f-light italic">Software Engineer</span></p>
                        <p className="text wrap">Tommy is an analytical thinker that enjoys the challenges of debugging new code. His years of experience in the military left him with the problem-solving ability and head-on approach to problems that may intimidate others using Ruby, Ruby on Rails, React, Redux, Javascript, Python, and HTML5/CSS3. The firey passion engendered for the software industry is the result of a new found love for technology and how open-sourced the community and its tools are. He hopes to share this passion with many others and show that the only impossibilities in software is limited by the individuals creativity.</p>
                    </div>
                </div>
                <div className="item inline-element p-t-125 p-x-40" >
                    <div className="content box-shadow7">
                        <div className="image bg-cover" style={{ backgroundImage: "url(https://i.imgur.com/Y6KXrkt.jpg)" }}></div>
                        <p className="t-18 f-bold wrap">Travis Tillotson | <span className="f-light italic">Software Engineer</span></p>
                        <p className="text wrap">Travis is a full-stack developer with experience in React, Redux, Ruby on Rails, Javascript and Python. With a background in psychology, he enjoys solving problems, understanding complex relationships and learning about technology.</p>
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
