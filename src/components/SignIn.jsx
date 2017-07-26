import React from 'react';
import {Link} from 'react-router';
import {firebaseApp, usersRef} from '../firebase';

export default class SignIn extends React.Component {
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

  signIn() {
    console.log('this.state', this.state);
    const { email, password } = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
          // let currUser = firebaseApp.auth().currentUser;
          // usersRef.child( currUser.uid ).set({
          //   email
          // });
      })
      .catch(error => {
        this.setState({error})
      })
  }

  render() {
    return (
      <div className="form-inline" style={{margin:'5%'}}>
        <h2>Sing In</h2>
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
            onClick={() => this.signIn()}
          >
            Sign In
          </button>
        </div>
        <div>{this.state.error.message}</div>
        <div className=""><Link to={'/signup'}>Sign up instead</Link></div>
      </div>
    );
  }
}
