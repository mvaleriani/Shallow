import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
//The Try Now button still needs to be converted to a Link
class Navbar extends React.Component {
  render() {

    return (
      <div>
        <div className="main-menu-1 main-menu " >
          <div id="menu" className="content max-width flex flex-justify-between flex-align-center p-x-40 ">
            <a className="logo main" href="index.html">
              {/* <img id="main-shallow-icon" src="../../app/assets/images/IconWShadow.png" /> */}
              <img id="nav-logo" className="a-l-c svg" src="https://raw.githubusercontent.com/mvaleriani/Shallow/master/docs/app/assets/images/shallowLogo.png" alt="logo" />
            </a>
            <ul className="buttons v-a-m" >
              <li>
                
                <Link className={"button1 menu-btn1 f-semi-bold"} to='/'>Home<div className="line"></div></Link>
              </li>
              <li>
                <Link className={"button1 menu-btn1 f-semi-bold"} to='/about'>Our Team<div className="line"></div></Link>
              </li>
              <li>
                <a className="button1 menu-btn1 f-semi-bold" href="https://github.com/mvaleriani/Shallow"><div>Github<div className="line"></div></div></a>
              </li>
              <li>
                <Link id="to-ai-button" className="button1 type6 f-semi-bold" to="/analysis" >
                  <div className="bg bg6 ease-cubicInOut transition-4ms"></div>
                  <div id="to-ai">Try now</div>
                </Link>
              </li>
            </ul>
            <div className="btn-menu a-r-c m-r-20 color7" onClick={byond.showMenuMobile(true, 1)} ><img alt="" className="svg" src="../../app/assets/images/icon-menu2.svg" /></div>
          </div>
          <div className="main-menu-dropdown cover-fixed bg6 color7 o-auto" >
            <div className="flex flex-cover m-w">
              <div className="logo color7 a-l-t m-l-20 m-t-40">
                <img className="a-l-c m-l-20 svg" src="../../app/assets/images/p1-logo1.svg" alt="logo" />
              </div>
              <div className="c-a-1">
                <div className="c-a-2">
                  <div className="t-right flex flex-cover flex-column flex-justify-center p-r-60 p-t-50" style={{flexWrap:'nowrap'}}>
                    <div className="buttons">
                      <div className="button button-alpha-25p t-60 f-extra-light l-h-normal transition animate"><a href="index.html">Home</a></div>
                      <div className="button button-alpha-25p t-60 f-extra-light l-h-normal transition animate"><a href="about.html"> About</a></div>
                      <div className="button button-alpha-25p t-60 f-extra-light l-h-normal transition animate"><a href="contact.html">Contact</a></div>
                    </div>
                    <div className="buttons m-t-20">

                      <div className="button button-alpha-25p t-24 f-light l-h-160 transition animate">  <a href="./index.html" >Demos</a></div>
                    </div>
                    <div className="social m-t-30">
                      <a className="button button-alpha-25p m-r-10 color2"><img alt="" className="icon svg" src="../../app/assets/images/icon-facebook.svg" /></a>
                      <a className="button button-alpha-25p "><img alt="" className="icon svg" src="../../app/assets/images/icon-twitter.svg" /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn-menu-close a-r-t m-r-20 m-t-20 color7 transition" onClick={byond.showMenuMobile(false, 1)} >
                <img className="svg" alt="" src="../../app/assets/images/icon-close.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
