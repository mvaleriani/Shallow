import React from 'react';

class FooterSection extends React.Component {
  render() {
    return(
     <div className="footer-fixed">
          <footer className="footer-1 bg1 p-y-80 p-x-20 cu-tweenmax"
              data-a-init="alpha:0"
              data-a-to="alpha:1, duration:0.9,ease:Cubic.easeOut"
          >
              <div className="m-w-1600 wrap flex">
                  <div className="column column1 flex-box-16p"  >
                        <img id="logo-2" src="https://raw.githubusercontent.com/mvaleriani/Shallow/master/docs/app/assets/images/shallowLogo2.png" alt="" />
                      <div className="social m-t-20" >
                          <a className="button-style4 type2 m-r-20">
                              <img className="icon svg" src="../../app/assets/images/icon-facebook.svg" alt="" />
                          </a>
                          <a className="button-style4 type2">
                              <img className="icon svg" src="../../app/assets/images/icon-twitter.svg" alt="" />
                          </a>
                      </div>
                  </div>
                  <div className="column column2 flex flex-box-50p">
                      <div>
                          <div className="color1 f-medium">Sections</div>
                          <ul className="list list-no-style t-14  m-t-40">
                              <li>
                                  <a className="button-style6 type2" href="index.html">
                                      <div className="bg"></div>
                                      <span>Home</span>
                                  </a>
                              </li>
                              <li>
                                  <a className="button-style6 type2" href="about.html">
                                      <div className="bg"></div>
                                      <span>Our Team</span>
                                  </a>
                              </li>
                              <li>
                                    <a className="button-style6 type2" href="https://github.com/mvaleriani/Shallow">
                                      <div className="bg"></div>
                                      <span>GitHub</span>
                                  </a>
                              </li>
                          </ul>
                      </div>

                      <div>
                          <div className="color1 f-medium">Contact</div>
                          <ul className="list list-no-style t-14  m-t-40">
                              <li>vggshallow@gmail.com</li>
                              {/* <li>1-800-456-7823</li>
                              <li>1900 West Hollywood, CA, 90204</li> */}
                          </ul>
                      </div>
                  </div>
                  <div className="column column3 flex flex-align-center flex-grow">
                      <div className="chat-button v-a-m" >
                          <div className="ball bg6 box-shadow1">
                              <i className="fa fa-commenting-o" aria-hidden="true"></i>
                          </div>
                          <div className="text f-bold">
                              <div>Do you need help?</div>
                              <div className="color1">Chat online</div>
                          </div>
                      </div>
                  </div>
              </div>
          </footer>
          <footer className="footer-2">
              <div className="flex flex-justify-between max-width">
                  <div className="t-12">Copyright © 2017 Byond Theme. </div>

              </div>
          </footer>
      </div>
    );
  }
}

export default FooterSection;
