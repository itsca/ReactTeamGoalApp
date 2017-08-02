import React from 'react';
import { connect } from 'react-redux';
import {Collapse} from 'react-bootstrap';
import { teamsRef, usersRef } from '../../firebase.js';

class AddTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addTeam() {
    //console.log('state add team', this.state);
    const { name } = this.state;
    const { uid } = this.props.user;
    console.log(uid);
    teamsRef.push({
      name,
      'admin' : uid
    })
    .then((snap) => {
      usersRef.child( uid ).child( 'teams' ).push({
        teamId: snap.key
      });
      teamsRef.child(snap.key).child( 'members' ).push({
        uid
      })
    })
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          style={{marginBottom: '1em'}}
          onClick={ ()=> this.setState({ open: !this.state.open })}
          disabled={this.state.open}>
          New Team
        </button>
        <Collapse in={this.state.open}>
          <div>
            <input type="text"
              type="text"
              placeholder="New Team Name"
              className="form-control"
              style= {{marginBottom: '1em'}}
              onChange={event => this.setState({name: event.target.value})}
            />
            <button
              className="btn btn-success"
              style={{marginRight: '1%'}}
              onClick={ () => this.addTeam() }>
              Add Team
            </button>
            <button
              className="btn btn-danger"
              onClick={ ()=> this.setState({ open: !this.state.open })}>
              Cancel
            </button>
          </div>
        </Collapse>
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

export default connect(mapStateToProps, null)(AddTeam);
