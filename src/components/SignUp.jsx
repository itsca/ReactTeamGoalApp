import React from 'react';
import {Link} from 'react-router';
import {firebaseApp} from '../firebase';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    }
  }

  signUp() {
    console.log('this.state', this.state);
    const { email, password } = this.state;
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({error})
      })
  }

  render() {
    return (
      <div className="form-inline" style={{margin:'5%'}}>
        <h2>Sing Up</h2>
        <div className="form-group">
          <input type="text"
            style={{marginRight: '5px', marginBottom: '10px'}}
            className="form-control"
            placeholder="email"
            onChange= {event => this.setState({email: event.target.value}) }
          />
          <input type="password"
            style={{marginRight: '5px', marginBottom: '10px'}}
            className="form-control"
            placeholder="password"
            onChange= {event => this.setState({password: event.target.value}) }
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => this.signUp()}
          >
            Sign Up
          </button>
        </div>
        <div>{this.state.error.message}</div>
        <div className=""><Link to={'/signin'}>Already a user?, sign in instead!</Link></div>
      </div>
    );
  }
}
