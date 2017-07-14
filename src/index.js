import React from 'react';
import ReactDom from 'react-dom';
//For V4 improvement
// import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';

ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById('root')
)
