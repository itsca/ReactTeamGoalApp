import React from 'react';
import {goalRef} from '../firebase.js';
import { connect } from 'react-redux';
import {setGoals} from '../actions/index.js';

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
      this.props.setGoals(goals);
    })
  }

  render() {
    console.log('this.props.goals', this.props.goals);
    return (
      <div>Goal List</div>
    );
  }
}

function mapStateToProps(state) {
  const { goals } = state;
  return {
    goals
  }
}


export default connect(mapStateToProps, {setGoals})(GoalList);
