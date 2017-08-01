import React from 'react';
import { connect } from 'react-redux';
import { firebaseApp, usersRef, teamsRef } from '../../firebase.js';

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
        console.log('MLC VAL', member.val().uid);
        if (member.val().uid != undefined) {
          usersRef.child(member.val().uid).on('value', snap2 => {
            const {userName, online} = snap2.val();
            const uid = snap2.key;
            members.push({uid, userName, online});
            this.setState({teamMembers : members});
          })
        }
      })
    })
  }

  render() {
    return (
      <div>
        <h5>Members</h5>
        {console.log(this.state.teamMembers)}
        {
          this.state.teamMembers.map((member, index) => {
              const memberName = member.userName;
              return (
                <div className="list-item" key={index}>
                  <h4>{memberName}</h4>
                </div>
              )
            }
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('MLC', state);
  const  { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps, null)(MemberList);
