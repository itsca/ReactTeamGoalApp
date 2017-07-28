import React from 'react';
import { connect } from 'react-redux';
import {setTeams} from '../../actions/index.js';
import AddTeam from './AddTeam.jsx';
import TeamList from './TeamList.jsx';
import { firebaseApp, usersRef, teamsRef } from '../../firebase.js';


class Teams extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('TEAMS', this.props);
    // userRef.child(auth.uid).child('groups').on('value', this.buildGroupList);
    // userRef.child(auth.uid).child('groups').on('child_removed', this.buildGroupList);
    // userRef.child(auth.uid).child('groups').on('child_added', this.buildGroupList);
  }

// componentDidUpdate() {
//   usersRef.child( this.props.uid ).child('teams').on('value', snap => {
//     let teams = [];
//     snap.forEach(team => {
//       const { teamId } = team.val();
//       //const serverKey = goal.key;
//       teamsRef.child(teamId).on('value', snap => {
//         const { name } = snap.val();
//         teams.push({name});
//       });
//     })
//     this.props.setTeams(teams);
//   })
// }

  render() {
    return (
      <div>
        {console.log('Props in teams', this.props)}
        <h4>Teams Component</h4>
        <AddTeam />
        <TeamList />
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log('AppState', state);
  const { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps, null)(Teams);
