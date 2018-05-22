import React from 'react';

class AboutHeader extends React.Component {
  render() {
    return (
        <section className="header-5 flex flex-align-center o-hidden p-x-20 min-h-350" data-cu-height="45%" style={{ backgroundImage: "url(https://i.imgur.com/glqKuG1.jpg)", minHeight: "648px", position: "relative", backgroundRepeat: "no-repeat"}}>
            
            <div id="nav-shadow"></div>
          
          <div className="color7" style={{position: "relative"}}>
             
              <h1 id="dev-title" className="f-extra-light t-60 l-h-100 t-center cu-tweenmax"
                  data-a-init="alpha:0"
                  data-a-to="alpha:1, duration:0.9, delay:0.6, ease:Cubic.easeOut"
              >Our Team Runs Deep</h1>

          </div>
      </section>
    );
  }
}

export default AboutHeader;
