import React from 'react';
import { connect } from 'react-redux';
import {setTeams} from '../../actions/index.js';
import { firebaseApp, usersRef, teamsRef } from '../../firebase.js';
import createFragment from 'react-addons-create-fragment';

class TeamList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('MountedProps', this.props);
    teamsRef.on('value', snap => {
      this.forceUpdate();
    })
  }

  render() {
    if(this.props.user.userTeams != undefined){
      console.log('PROPS IN PRERENDER?', this.props);
      console.log(this.props.user.userTeams.length);
      if (this.props.user.userTeams.length > 0) {
        return(
          <div>{
            this.props.user.userTeams.map((team, index) => {
                const teamName = team.name;
                return (
                  <div key={index}>{teamName}</div>
                  //<GoalItem key={index} goal={goal} />
                )
              }
            )
          }</div>
        )
      }
    }
    return (
      <div>No teams{
        this.props.user.userName
        // this.props.user.userTeams.map((team, index) => {
        //     return (
        //       <div>Teams</div>
        //       //<GoalItem key={index} goal={goal} />
        //     )
        //   }
        // )
      }</div>
    );
  }
}

function mapStateToProps(state) {
  const  { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps, null)(TeamList);
