import React from 'react';
import {Glyphicon} from 'react-bootstrap';

class TeamMember extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Glyphicon glyph="user" style={this.props.member.online ? {color: '#4caf50'} : {color: '#9e9e9e'}}/>
        {this.props.member.admin ? <Glyphicon glyph="star" style={{color: '#eefd08'}}/> : ''}
        {' ' + this.props.member.userName + ' '}
      </div>);
  }
}

export default TeamMember;
