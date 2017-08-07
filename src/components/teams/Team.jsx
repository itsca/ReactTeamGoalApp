import React from 'react';
import { connect } from 'react-redux';
import { firebaseApp, usersRef, teamsRef} from '../../firebase';
import AddGoal from '../goals/AddGoal.jsx';
import GoalList from '../goals/GoalList.jsx';
import CompleteGoalList from '../goals/CompleteGoalList.jsx';
import TeamMembers from '../members/members.jsx';
import MemberList from '../members/memberList.jsx';

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false,
      currentTeam: [],
    }
  }

  componentDidMount() {
    teamsRef.child(this.props.params.id).on('value', (snap) => {
      this.setState({'currentTeam' : snap.val()});
    });
    teamsRef.child(this.props.params.id).child('admin').on('value', snap => {
      if (this.props.state.user != undefined) {
        if (this.props.state.user.uid === snap.val()) {
          this.setState({admin : true});
        }
      }
    })
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
        <div className="col-xs-4 teamMembersWrapper" style={{float: 'left'}}>
          <MemberList tid={ this.props.params.id } admin={this.state.admin}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log('MLC', state);
  return {
    state
  }
}

export default connect(mapStateToProps, null)(Team);
