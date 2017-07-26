import React from 'react';
import { connect } from 'react-redux';
import { firebaseApp, usersRef } from '../firebase.js';
import AddGoal from './AddGoal.jsx';
import GoalList from './GoalList.jsx';
import CompleteGoalList from './CompleteGoalList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

 signOut() {
   usersRef.child( this.props.user.uid ).update({
     online: false
   });
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
          <h4>Complete Goals</h4>
          <CompleteGoalList />
        </div>
        <br/>
        <button className="btn btn-danger"
          onClick={() => this.signOut()}>Sign Out</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('AppState', state);
  const { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps, null)(App);
