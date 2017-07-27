import React from 'react';
import AddTeam from './AddTeam.jsx';
import TeamList from './TeamList.jsx';

export default class Teams extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h4>Teams Component</h4>
        <AddTeam />
        <TeamList />
      </div>
    );
  }
}
