import React from 'react';
import { firebaseApp } from '../firebase.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

 signOut() {
   firebaseApp.auth().signOut();
 }

  render() {
    return (
      <div>
        App
        <br/>
        <button className="btn btn-danger"
          onClick={() => this.signOut()}>Sign Out</button>
      </div>
    );
  }
}
