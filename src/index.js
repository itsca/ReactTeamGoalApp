import React from 'react';
import ReactDom from 'react-dom';
//For V4 improvement
// import { BrowserRouter } from 'react-router-dom';
import { Router, Route, IndexRoute,  browserHistory } from 'react-router';
import { firebaseApp, usersRef, teamsRef} from './firebase';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/index.js';
import { logUser } from './actions/index.js';
import App from './components/App.jsx';
import Teams from './components/teams/Teams.jsx';
import Team from './components/teams/Team.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';

const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    //console.log('user has signed in or up', user);
    const { uid } = user;
    usersRef.child( uid ).once('value').then( (snapshot) => {
      if (snapshot.val()) {
        let {email, userName} = snapshot.val();
        store.dispatch(logUser(email, userName, uid));
      }
    });
    browserHistory.push('/app');
  } else {
    // console.log('user has signed out or still need to sign in.');
    browserHistory.replace('/signin');
  }
})




ReactDom.render(
  <Provider store={store}>
    <Router path="/" history={browserHistory}>
    <Route path="/app" component={App}>
      <IndexRoute component={Teams}/>
      <Route path="team/:id" component={Team}/>
    </Route>
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    </Router>
  </Provider>, document.getElementById('root')
)
