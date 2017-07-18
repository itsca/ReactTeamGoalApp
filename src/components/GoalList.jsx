import React from 'react';
import {goalRef} from '../firebase.js';

class GoalList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    goalRef.on('value', snap => {
      let goals = [];
      snap.forEach(goal => {
        const {email, title} = goal.val();
        goals.push({email, title});
      })
      console.log('goals', goals);
    })
  }

  render() {
    return (
      <div>Goal List</div>
    );
  }
}

export default GoalList;
