import React from 'react';
import {goalRef, teamsRef} from '../../firebase.js';
import { connect } from 'react-redux';
import {setGoals} from '../../actions/index.js';
import GoalItem from './GoalItem.jsx';

class GoalList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    teamsRef.child(this.props.tid).child('goals').on('value', snap => {
      let goals = [];
      snap.forEach(goal => {
        const {email, title} = goal.val();
        const serverKey = goal.key;
        goals.push({email, title, serverKey});
      })
      console.log('goals', goals);
      this.props.setGoals(goals);
    })
  }

  render() {
    //console.log('this.props.goals', this.props.goals);
    return (
      <div>{
        this.props.goals.map((goal, index) => {
            return (
              <GoalItem key={index} goal={goal} tid={this.props.tid}/>
            )
          }
        )
      }</div>
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
