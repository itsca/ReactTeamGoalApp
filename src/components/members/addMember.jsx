import React from 'react';
import {Glyphicon, Modal, Button, FormGroup, FormControl, InputGroup, ListGroup, ListGroupItem, Clearfix} from 'react-bootstrap';
import { firebaseApp, usersRef, teamsRef} from '../../firebase';


class AddMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'showModal': false,
      'userSearchResult': [],
      'userNotFound': false,
      'alreadyAMember': false,
    }
  }

  modalHandler() {
    this.setState({ showModal: !this.state.showModal, userSearchResult: [], 'userNotFound' : false});
  }

  searchUser() {
    this.setState({ 'userSearchResult' : [] });
    this.setState({ 'userNotFound' : false });
    if (this.state.userSearchValue != undefined) {
      usersRef.orderByChild('email').equalTo(this.state.userSearchValue).on('value', snap => {
        if (snap.val() != undefined && snap.val() != null) {
          let searchResult = [];
          let snapVal = snap.val();
          let snapArray = Object.keys(snap.val()).map(key => snap.val()[key]);
          searchResult.push(snapArray);
          ////
          if (snapArray[0]) {
            this.checkIfMember(snapArray[0].teams);
          }
          ////
          this.setState({ 'userSearchResult' : snapArray });
        } else {
          this.setState({ 'userNotFound' : true });
        }
      })
    }
  }

  addMember() {

  }

  checkIfMember(teams) {
    if (teams != undefined && teams != null) {
      let teamsArray = Object.keys(teams).map(key => teams[key]);
      teamsArray.forEach(function(val,index){
         if (val.teamId === this.props.tid) {
           this.setState({ 'alreadyAMember' : true });
         }
      }, this)  
    }
  }

  userFoundHandler() {
    if (this.state.userNotFound) {
      return (
          <p><strong>Sorry, no user found with that email :(</strong></p>
      )
    }
    return (
      this.state.userSearchResult.map((member, index) => {
        const {userName} = member;
          return (
              <ListGroupItem key={index}>
                <p style={{float: 'left', paddingTop: '0.5em'}}> <strong> {userName} </strong></p>
                <Button className="btn-success"
                        style={{float: 'right'}}
                        onClick={() => {this.addMember()}}
                        disabled={this.state.alreadyAMember}
                >
                  + Add
                </Button>
                <Clearfix></Clearfix>
              </ListGroupItem>
          )
      })
    )
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          style={{marginBottom: '1em'}}
          onClick={()=> this.modalHandler()}>
          + Add a Member
        </button>
        <Modal show={this.state.showModal} onHide={()=> this.modalHandler()}>
            <Modal.Header closeButton>
              <Modal.Title>Add a member.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <FormGroup>
                  <InputGroup>
                    <FormControl type="text"
                                 placeholder="Serch user by email"
                                 onChange={event => this.setState({userSearchValue: event.target.value})}
                                 />
                    <InputGroup.Button>
                      <Button className="btn-success"
                              onClick={() => {this.searchUser()}}
                      >
                        Search
                      </Button>
                    </InputGroup.Button>
                  </InputGroup>
                </FormGroup>
                <ListGroup>
                  {this.userFoundHandler()}
                </ListGroup>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={()=> this.modalHandler()}>Close</Button>
            </Modal.Footer>
          </Modal>
      </div>
    );
  }
}

export default AddMember;
