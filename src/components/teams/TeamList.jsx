import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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

  componentDidMount() {
    if (this.props.user.uid) {
      usersRef.child( this.props.user.uid ).child('teams').on('value', snap => {
        let teams = [];
        snap.forEach(team => {
          const { teamId } = team.val();
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
  }

  componentWillReceiveProps(nextProps) {
    let uid = nextProps.user.uid != undefined ? nextProps.user.uid : 0;
    usersRef.child( uid ).child('teams').on('value', snap => {
      let teams = [];
      snap.forEach(team => {
        const { teamId } = team.val();
        teamsRef.child(teamId).on('value', snap => {
          const serverKey = snap.key;
          const { name } = snap.val();
          teams.push({name, serverKey});
          this.forceUpdate();
        });
      })
      this.setState({userTeams: teams});
      this.props.setTeams(teams);
    })
  }

  render() {
    return (
      <div style={{paddingTop: '3em'}}>
        <h4>Your Teams:</h4>
        <hr/>
        <div>
          {
            this.state.userTeams.map((team, index) => {
                const teamName = team.name;
                const serverKey = team.serverKey;
                return (
                  <div className="list-item" key={index}>
                    <h4>{teamName}</h4>
                    <Link to={"app/team/" + serverKey}>teamlink</Link>
                  </div>
                )
              }
            )
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  //console.log('TLC AppState', state);
  const  { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps, {setTeams})(TeamList);
