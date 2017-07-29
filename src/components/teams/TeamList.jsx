import React from 'react';
import { connect } from 'react-redux';
import {setTeams} from '../../actions/index.js';
import { firebaseApp, usersRef, teamsRef } from '../../firebase.js';
import createFragment from 'react-addons-create-fragment';

class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userTeams: [],
    }
  }

  componentWillUpdate() {
    // console.log('TLC', this.props);
    // let uid = this.props.uid != undefined ? this.props.uid : 0;
    // console.log('TLC', uid);
    // usersRef.child( uid ).child('teams').on('value', snap => {
    //   let teams = [];
    //   snap.forEach(team => {
    //     const { teamId } = team.val();
    //     //const serverKey = goal.key;
    //     teamsRef.child(teamId).on('value', snap => {
    //       const { name } = snap.val();
    //       teams.push({name});
    //     });
    //   })
    //   this.props.setTeams(teams);
    // })
  }

  componentWillReceiveProps(nextProps) {
    console.log('NEXTPROPS', nextProps);
    let uid = nextProps.user.uid != undefined ? nextProps.user.uid : 0;
    console.log('TLC', uid);
    usersRef.child( uid ).child('teams').on('value', snap => {
      let teams = [];
      snap.forEach(team => {
        const { teamId } = team.val();
        //const serverKey = goal.key;
        teamsRef.child(teamId).on('value', snap => {
          const serverKey = snap.key;
          const { name } = snap.val();
          teams.push({name, serverKey});
          this.forceUpdate();
        });
      })
      console.log(teams);
      this.setState({userTeams: teams});
      this.props.setTeams(teams);
    })
  }

  componentDidMount() {
    console.log('MountedProps', this.props);
    // const { uid } = this.props || 0;
    // console.log(firebaseApp.auth);
    // usersRef.child(firebaseApp.auth.uid).child('teams').on('value', snap => {
    //   console.log('VALUE FROM AUTH');
    // });
    // teamsRef.on('value', snap => {
    //   ///////////////////
    //   console.log('TLISTC',uid);
    //   console.log('TLISTC',this.props);
    //   // let userTeams = [];
    //   // const obj = teams;
    //   // const userTeamRefsArray = Object.keys(obj).map(function (key) { return obj[key];});
    //   // userTeamRefsArray.forEach((val, index) => {
    //   //   /////////////
    //   //   teamsRef.child( val.teamId ).on('value', snap => {
    //   //       userTeams.push(snap.val());
    //   //   })
    //   //   /////////////
    //   // });
    //   ///////////////////
    //   this.forceUpdate();
    // })
  }

  render() {
    console.log('RENDEREDProps', this.props);
    console.log('RENDEREDSTATE', this.state);
    if(this.state.userTeams != undefined){
      // console.log('PROPS IN PRERENDER?', this.props);
      // console.log(this.props.user.userTeams.length);
      console.log('RENDEREDSTATEARRAY', this.state.userTeams);
      console.log('RENDEREDSTATELENGHT', this.state.userTeams.length);
      return(
        <div>
          <h3>Your Teams:</h3>
          <div>
            {
              this.state.userTeams.map((team, index) => {
                  const teamName = team.name;
                  return (
                    <div key={index}>{teamName}</div>
                    //<GoalItem key={index} goal={goal} />
                  )
                }
              )
            }
          </div>
      </div>
      )
      ////
      if (this.state.userTeams.length > 0) {
        return(
          <div>
            <h3>Your Teams:</h3>
            <div>
              {
                this.props.user.userTeams.map((team, index) => {
                    const teamName = team.name;
                    return (
                      <div key={index}>{teamName}</div>
                      //<GoalItem key={index} goal={goal} />
                    )
                  }
                )
              }
            </div>
        </div>
        )
      }
      ////
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
  console.log('TLC AppState', state);
  const  { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps, {setTeams})(TeamList);
