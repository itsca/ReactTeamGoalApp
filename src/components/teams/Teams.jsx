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

  render() {
    return (
      <div>
        <AddTeam  />
        <TeamList />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps, null)(Teams);
