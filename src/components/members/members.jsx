import React from 'react';
import { firebaseApp, usersRef, teamsRef } from '../../firebase.js';

class TeamMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false,
      members: [],
    }
  }

  componentDidMount() {
    teamsRef.child(this.props.tid).child('members').on('value', snap => {
      let members = [];
      snap.forEach(member => {
        // const {email, title} = goal.val();
        // const serverKey = goal.key;
        // goals.push({email, title, serverKey});
      })
      
      //this.props.setGoals(goals);
    })
  }

  render() {
    return (<div>MyComponent</div>);
  }
}

export default TeamMembers;
