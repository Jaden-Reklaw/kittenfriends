import React, { Component } from 'react';
import { connect } from 'react-redux';

//Import components to be used on this component
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Swal from 'sweetalert2';

class AddKittenModal extends Component {
  state = {
    newKitten: {
      name: '',
      email: '',
    }
  }

  //Handle changes to the fields and stores them into state before submitting
  handleChangeFor = (event, propertyName) => {
    this.setState({
        newKitten: {...this.state.newKitten,[propertyName]: event.target.value,}
      });
  }

  //Submits the form to be added to the database
  handleSubmit = () => {
    //Sends a dispatch to post a new ktten.
    this.props.dispatch({type: 'ADD_KITTEN', payload: {newKitten: this.state.newKitten}});
    //Close Modal after submit
    this.props.onHide();
    Swal.fire({
      position: 'middle-end',
      icon: 'success',
      title: `Success! You have added ${this.state.newKitten.name}`,
      showConfirmButton: false,
      timer: 3000  //3seconds
    });
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New Kitten Friend
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Kitten Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Kitten Name"
                onChange={(event) => this.handleChangeFor(event, 'name')}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Kitten Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Kitten Email"
                onChange={(event) => this.handleChangeFor(event, 'email')}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Add Kitten
          </Button>
          <Button onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect()(AddKittenModal);