import React from 'react';
import {Glyphicon, Modal, Button, FormGroup, FormControl, InputGroup} from 'react-bootstrap';
import { firebaseApp, usersRef, teamsRef} from '../../firebase';


class AddMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'showModal': false,
      'userSearchResult': [],
    }
  }

  searchUser() {
    if (this.state.userSearchValue != undefined) {
      usersRef.orderByChild('email').equalTo(this.state.userSearchValue).on('value', snap => {
        let searchResult = [];
        let snapVal = snap.val();
        let snapArray = Object.keys(snap.val()).map(key => snap.val()[key]);
        searchResult.push(snapArray);
        this.setState({ 'userSearchResult' : snapArray });
        console.log('AMC', this.state);
        console.log('AMC KEY', snapArray);
      })
    }
  }

  modalHandler() {
    this.setState({ showModal: !this.state.showModal, userSearchResult: []});
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
                {
                  this.state.userSearchResult.map((member, index) => {
                    console.log(member.userName)
                    const {userName} = member;
                      return (
                        <div key={index}>{userName}</div>
                      )
                    }
                  )
                }
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
