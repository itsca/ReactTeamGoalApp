import React from 'react';
import { connect } from 'react-redux';
import { firebaseApp, usersRef } from '../firebase.js';
import AddGoal from './AddGoal.jsx';
import GoalList from './GoalList.jsx';
import CompleteGoalList from './CompleteGoalList.jsx';
import Teams from './teams/Teams.jsx';

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
          <div className="header" style={{marginBottom: '3em'}}>
            <h3>Team Goals</h3>
            <p style={{display: 'inline-block', marginRight: '5%'}}>
              Welcome {this.props.user.userName}
            </p>
            <button className="btn btn-danger"
                    style={{display: 'inline-block'}}
              onClick={() => this.signOut()}>Sign Out
            </button>
            <hr />
          </div>
          <Teams />
          {/* <AddGoal />
          <hr />
          <h4>Goals:</h4>
          <GoalList />
          <hr />
          <h4>Complete Goals</h4>
          <CompleteGoalList /> */}
        </div>
        <br/>
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
