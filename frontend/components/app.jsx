import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import Navbar from './navbar/navbar';
import Home from './home/home';
import About from './about_us/about';
import FooterSection from './footer/footer_section';

const App = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/about' component={About}/>
      </Switch>
      <footer>
        <FooterSection />
      </footer>
    </div>
  );
};

export default App;
