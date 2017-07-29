import React from 'react';
import { connect } from 'react-redux';
import { teamsRef, goalRef } from '../../firebase.js';

class AddGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
  }

  addGoal() {
    console.log('this', this);
    const {title} = this.state;
    const {email} = this.props.user;
    teamsRef.child(this.props.tid).child('goals').push({email, title});
  }

  render() {
    return (
      <div>
        <div className="form-inline">
          <div className="formGroup">
            <input type="text"
              type="text"
              placeholder="Add a goal"
              className="form-control"
              style= {{marginRight: '5px'}}
              onChange={event => this.setState({title: event.target.value})}
            />
            <button className="btn btn-success" type="button"
              onClick={() => this.addGoal()}
            >
              Submit
            </button>
          </div>
        </div>
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

export default connect(mapStateToProps, null) (AddGoal);
