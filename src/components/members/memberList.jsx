import React from 'react';
import { connect } from 'react-redux';
import { firebaseApp, usersRef, teamsRef } from '../../firebase.js';
import TeamMember from './member.jsx';
import AddMember from './addMember.jsx';

class MemberList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false,
      teamMembers: [],
    }
  }
  componentDidMount() {
    let members = [];
    teamsRef.child(this.props.tid).child('members').on('value', snap => {
      snap.forEach( member => {
        if (member.val().uid != undefined) {
          usersRef.child(member.val().uid).on('value', snap2 => {
            const {userName, online} = snap2.val();
            const memberUid = snap2.key;
            let admin = false;
            if (this.props.user != undefined) {
              if ( memberUid === this.props.user.uid) {
                admin = true;
              }
            }
            members.push({memberUid, userName, online, admin});
            ////
            if (members.length > 0) {
              for (var i = 0; i < members.length; i++) {
                if (members[i + 1] != undefined) {
                  if (members[i].memberUid === members[i + 1].memberUid) {
                    console.log(members);
                    console.log('Same User');
                    members.splice(i, 1);
                    console.log(members);
                  }
                }
              }
            }
            ////
            //this.setState({teamMembers : []});
            //console.log('MLC', this.state.teamMembers);
            this.setState({teamMembers : members});
            //console.log('MLC', this.state.teamMembers);
          })
        }
      })
    })
    teamsRef.child(this.props.tid).child('admin').on('value', snap => {
      if (this.props.user != undefined) {
        if (this.props.user.uid === snap.val()) {
          this.setState({admin : true});
        }
      }
    })
  }

  checkForAdd() {
    if (this.state.admin === true) {
      return (
        <AddMember tid={this.props.tid}/>
      );
    }
  }

  render() {
    return (
      <div>
        {this.checkForAdd()}
        <h5>Members</h5>
        <ul className="list-group">
          {
            this.state.teamMembers.map((member, index) => {
              const {memberUid, userName, online, admin} = member;
                return (
                  <li className="list-group-item" key={index}>
                    <TeamMember member={member}/>
                  </li>
                )
              }
            )
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log('MLC', state);
  const  { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps, null)(MemberList);
