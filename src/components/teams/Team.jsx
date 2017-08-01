import React from 'react';
import { firebaseApp, usersRef, teamsRef} from '../../firebase';
import AddGoal from '../goals/AddGoal.jsx';
import GoalList from '../goals/GoalList.jsx';
import CompleteGoalList from '../goals/CompleteGoalList.jsx';
import TeamMembers from '../members/members.jsx';
import MemberList from '../members/memberList.jsx';

export default class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTeam: [],
    }
  }

  componentDidMount() {
    teamsRef.child(this.props.params.id).on('value', (snap) => {
      this.setState({'currentTeam' : snap.val()});
    });
  }

  render() {
    return (
      <div>
        <div className="col-xs-8" style={{float: 'left'}}>
          <h3>{this.state.currentTeam.name}</h3>
          <AddGoal tid={this.props.params.id}/>
          <hr />
          <h4>Goals:</h4>
          <GoalList tid={this.props.params.id}/>
          <hr />
          <h4>Complete Goals</h4>
          <CompleteGoalList tid={this.props.params.id}/>
        </div>
        <div className="col-xs-4" style={{float: 'left'}}>
          <MemberList tid={ this.props.params.id }/>
        </div>
      </div>
    );
  }
}
