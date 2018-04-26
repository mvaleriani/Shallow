import React from 'react';
import { HashRouter } from 'react-router-dom';
import App from './app';

/*
  This usually has a Provider component that takes in store, but since
  we don't have a state at the moment, it is not included to avoid errors.
*/

const Root = ({ store }) => (
  <HashRouter>
    <App />
  </HashRouter>
);

export default Root;
