import React from 'react';

class ContactSection extends React.Component {
  render() {
    return(
      <section className="content-15 flex p-t-250 p-b-200 p-x-20 cu-tweenmax"
          data-a-init="alpha:0, y:50"
          data-a-to="alpha:1, y:0"
          data-a-gap="300"
      >
            <div className="cover bg-cover parallax-bg" style={{ backgroundImage:"url(https://i.imgur.com/MM92ext.jpg)"}} ></div>
          <div className="cover" style={{background:"rgba(41,53,76,0.4)"}}></div>
          <div className="color7 t-center">
              <div className="t-left">
                <div className="line1 bg1 m-l-20- absolute cu-tweenmax"
                    data-a-init="x:300, alpha:0, scaleX:1"
                    data-a-to="x:300, alpha:0.5, scaleX:50, ease:Expo.easeIn, duration:0.6"
                    data-a-to-2="x:0, alpha:1, scaleX:1, ease:Expo.easeOut, duration:1"
                >
              </div>
                <h3 className="f-extra-light t-60 l-h-100 t-center cu-tweenmax"
                    data-a-init="alpha:0"
                    data-a-to="alpha:1, duration:0.9, delay:0.6, ease:Cubic.easeOut"
                >Questions about anything? </h3>
          </div>
            <div className="cu-tweenmax"
                data-a-init="alpha:0"
                data-a-to="alpha:1, duration:0.9, delay:0.4, ease:Cubic.easeOut"
            >
                <p className="t-20 m-t-10">shoot us an email</p>

                    <a className="button-style1 type2 m-t-40" href="mailto:vggshallow@gmail.com" >
                        <div className="arrow"><img className="svg" src="../../app/assets/images/arrow.svg" alt="" /></div>
                        <div className="bg-fx"></div>
                        <div className="arrow2"><img className="svg" src="../../app/assets/images/arrow_complete.svg" alt="" /></div>
                        <span className="f-bold">Contact Us</span>
                    </a>

            </div>
          </div>
      </section>
    );
  }
}

export default ContactSection;
