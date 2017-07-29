import React from 'react';
import { connect } from 'react-redux';
import {completeGoalRef, goalRef, teamsRef} from '../../firebase.js';

class GoalItem extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  completeGoal() {
    const {email} = this.props.user;
    const {title, serverKey} = this.props.goal;
    teamsRef.child(this.props.tid).child('goals').child(serverKey).remove();
    teamsRef.child(this.props.tid).child('completedGoals').push({email, title});
  }

  render() {
    const { email, title} = this.props.goal;
    return (
      <div style={{margin:'5px'}}>
        <strong>{title} </strong>
        <span style={{marginRight: '5px'}}>submitted by <em>{email}</em></span>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => this.completeGoal()}>
          Complete
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps, null)(GoalItem);
