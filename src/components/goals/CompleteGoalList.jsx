import React from 'react';
import { connect } from 'react-redux';
import { completeGoalRef, teamsRef } from '../../firebase.js';
import { setCompleted } from '../../actions/index.js';

class CompleteGoalList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
  teamsRef.child(this.props.tid).child('completedGoals').on('value', snap => {
      let completeGoals = [];
      snap.forEach(completeGoal => {
        const { email, title } = completeGoal.val();
        completeGoals.push({email, title})
      })
      this.props.setCompleted(completeGoals);
   })
  }

  clearCompleted() {
    teamsRef.child(this.props.tid).child('completedGoals').set([]);
  }

  render() {
    return (
      <div>
          {
          this.props.completeGoals.map((completeGoal, index) => {
            const { title, email } = completeGoal;
            return (
              <div key={index}>
                <strong>{title}
                 completed by <em> {email} </em>
                </strong>
              </div>
            )
          })
        }
        <button className="btn btn-primary"
          onClick={() => this.clearCompleted()}>
          Clear All
        </button>
    </div>
    );
  }
}


function mapStateToProps(state) {
  const {completeGoals} = state;
  // console.log('state', state);
  return {
    completeGoals
  }
}

export default connect(mapStateToProps, {setCompleted})(CompleteGoalList);
