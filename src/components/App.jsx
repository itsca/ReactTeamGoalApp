import React from 'react';
import { connect } from 'react-redux';
import { firebaseApp, usersRef } from '../firebase.js';
import Teams from './teams/Teams.jsx';
import Team from './teams/Team.jsx';
import '../App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

 signOut() {
   if (this.props.user.uid) {
     usersRef.child( this.props.user.uid ).update({
       online: false
     });
   }
   firebaseApp.auth().signOut();
 }

  render() {
    return (
      <div style={{margin: '10%'}}>
        <div className="">
          <div className="header">
            <h1 className="logo">Mebi.</h1>
            <p style={{display: 'inline-block', marginRight: '5%'}}>
              Welcome {this.props.user.userName}
            </p>
            <button className="btn btn-danger"
                    style={{display: 'inline-block', float: 'right'}}
              onClick={() => this.signOut()}>Sign Out
            </button>
          </div>
          {this.props.children}
        </div>
        <br/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log('AppState', state);
  const { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps, null)(App);
