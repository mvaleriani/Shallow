import React from 'react';

class TeamMembersSection extends React.Component {
  render() {
    return (
      <section className="grid-items-9 p-x-20 p-t-100">

          <div className="t-center m-t-20-" >
                  <div className="inline m-b-20 t-left">
                      <div className="line1 bg3 m-l-20- cu-tweenmax"
                          data-a-init="x:300, alpha:0, scaleX:1"
                          data-a-to="x:300, alpha:0.5, scaleX:50, ease:Expo.easeIn, duration:0.6"
                          data-a-to-2="x:0, alpha:1, scaleX:1, ease:Expo.easeOut, duration:1"
                      ></div>
                      <h2 className="color2 f-medium l-s-3 cu-tweenmax"
                          data-a-init="alpha:0"
                          data-a-to="alpha:1, duration:0.9, delay:0.6, ease:Cubic.easeOut"
                      >Team</h2>
                  </div>
              </div>

          <div className="list max-width flex flex-3 cu-tweenmax"
              data-a-init-child="alpha:0, y:200"
              data-a-stagger-child="alpha:1, y:0, ease:Cubic.easeOut, duration:0.6, stagger:0.1"
              data-a-gap="200"
          >

                  <div className="item p-x-20 p-y-20" >
                      <div className="data p-b-125p bg-cover" >
                          <img className="cover" src="../../app/assets/images/t-1.jpg" alt="" />
                          <div className="more cover p-x-50 p-y-50" style={{background:"rgba(41,53,76,0.5)"}}>
                              <p className="desc color7 t-18 a-l-b m-b-40 m-l-40" ><span className="f-bold">Travis Tillotson |</span> <span>President</span></p>
                          </div>
                      </div>
                  </div>

                  <div className="item p-x-20 p-y-20" >
                      <div className="data p-b-125p bg-cover" >
                          <img className="cover" src="../../app/assets/images/t-2.jpg" alt="" />
                          <div className="more cover p-x-50 p-y-50" style={{background:"rgba(41,53,76,0.5)"}}>
                              <p className="desc color7 t-18 a-l-b m-b-40 m-l-40" ><span className="f-bold">Tommy Pham |</span> <span>President</span></p>
                          </div>
                      </div>
                  </div>

                  <div className="item p-x-20 p-y-20" >
                      <div className="data p-b-125p bg-cover" >
                          <img className="cover" src="../../app/assets/images/t-3.jpg" alt="" />
                          <div className="more cover p-x-50 p-y-50" style={{background:"rgba(41,53,76,0.5)"}}>
                              <p className="desc color7 t-18 a-l-b m-b-40 m-l-40" ><span className="f-bold">Michael Valeriani |</span> <span>President</span></p>
                          </div>
                      </div>
                  </div>

                  <div className="item p-x-20 p-y-20" >
                      <div className="data p-b-125p bg-cover" >
                          <img className="cover" src="../../app/assets/images/t-4.jpg" alt="" />
                          <div className="more cover p-x-50 p-y-50" style={{background:"rgba(41,53,76,0.5)"}}>
                              <p className="desc color7 t-18 a-l-b m-b-40 m-l-40" ><span className="f-bold">Ozzy Paniagua |</span> <span>President</span></p>
                          </div>
                      </div>
                  </div>
          </div>
      </section>
    );
  }
}

export default TeamMembersSection;
