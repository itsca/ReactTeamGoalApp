import React from 'react';
import ReactDom from 'react-dom';
//For V4 improvement
// import { BrowserRouter } from 'react-router-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';

ReactDom.render(
  <Router path="/" history={browserHistory}>
  <Route path="/app" component={App} />
  <Route path="/signin" component={SignIn} />
  <Route path="/signup" component={SignUp} />
  </Router>, document.getElementById('root')
)
