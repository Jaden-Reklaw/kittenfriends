import React, { Component } from 'react';
import { connect } from 'react-redux';

//Import components to be used on this component
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class AddKittenModal extends Component {

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
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Kitten Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Kitten Email"
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