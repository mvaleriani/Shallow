import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  //See root file about store/state
  const root = document.getElementById('root'); //index.html found in app/views
  ReactDOM.render(<Root/>, root);
});
