import React from 'react';
import { completeGoalRef } from '../firebase.js';

export default class CompleteGoalList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
  completeGoalRef.on('value', snap => {
      let completeGoals = [];
      snap.forEach(completeGoal => {
        const { email, title } = completeGoal.val();
        completeGoals.push({email, title})
      })
      console.log('completeGoals', completeGoals);
   })
  }

  render() {
    return (
      <div>Complete Goal List</div>
    );
  }
}
