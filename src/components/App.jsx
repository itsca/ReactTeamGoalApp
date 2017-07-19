import React from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase.js';
import AddGoal from './AddGoal.jsx';
import GoalList from './GoalList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

 signOut() {
   firebaseApp.auth().signOut();
 }

  render() {
    return (
      <div style={{margin: '10%'}}>
        <div className="">
          <h3>Team Goals</h3>
          <AddGoal />
          <hr />
          <h4>Goals:</h4>
          <GoalList />
          <hr />
        </div>
        <br/>
        <button className="btn btn-danger"
          onClick={() => this.signOut()}>Sign Out</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('state', state);
  return {}
}

export default connect(mapStateToProps, null)(App);
