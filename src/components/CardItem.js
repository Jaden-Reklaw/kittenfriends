import React, { Component } from 'react';
import { connect } from 'react-redux';

//Import Bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class CardItem extends Component {
    //Create state to change individual cards after they click edit

    state = {
        isEdit: false,
        newData: {
            name: this.props.name,
            email: this.props.email
        }
    }

    handleDelete = () => {
        console.log('handleDelete pressed!');
        this.props.dispatch({type: 'DELETE_KITTEN', payload: {id: this.props.id}});
    }

    //Event for clicking on the edit button
    //Should change the state isEdit to true to render all the other card
    handleEdit = () => {
        this.setState({isEdit: true});
    }

    handleUpdate = () => {
        this.props.dispatch({type: 'UPDATE_KITTEN_INFO', payload: {id: this.props.id, newData: {name: this.state.newData.name, email: this.state.newData.email}}});
        console.log('handleUpdate pressed!', this.props.id);
        this.setState({isEdit: false});
    }

      //Handle changes to the fields and stores them into state before submitting
  handleChangeFor = (event, propertyName) => {
    this.setState({
        newData: {...this.state.newData,[propertyName]: event.target.value,}
      });
  }

    render() {
        const {id, name, email} = this.props;

        if(this.state.isEdit === false) {
            return (
                <Card 
                    style={{ width: '18rem', display:'inline-block', margin:'12px'}} 
                    className="text-center shadow p-3 mb-5 bg-white rounded"
                >
                    <Card.Img variant="top" src={`https://robohash.org/${id}?set=set4`} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                        {email}
                        </Card.Text>
    
                        {/* Edit Button */}
                        <Button 
                            variant="primary" 
                            block="true"
                            onClick={this.handleEdit}
                        >Edit</Button>
    
                        {/* Delete Button */}
                        <Button 
                            variant="danger" 
                            block="true"
                            onClick={this.handleDelete}
                        >Delete</Button>
    
                    </Card.Body>
                </Card>
            );
        } else {
            return (
                <Card 
                    style={{ width: '18rem', display:'inline-block', margin:'12px'}} 
                    className="text-center shadow p-3 mb-5 bg-white rounded"
                >
                    <Card.Img variant="top" src={`https://robohash.org/${id}?set=set4`} />
                    <Card.Body>
                    <Form>
                        {/* Name Field */}
                        <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            value={this.state.newData.name}
                            onChange={(event) => this.handleChangeFor(event,'name')} />
                        </Form.Group>
                        {/* Email Field */}
                        <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            value={this.state.newData.email}
                            onChange={(event) => this.handleChangeFor(event, 'email')} />
                        </Form.Group>
                    </Form> 
    
                        {/* Edit Button */}
                        <Button 
                            variant="success" 
                            block="true"
                            type="submit"
                            onClick={this.handleUpdate}
                        >Update</Button>
                    </Card.Body>
                </Card>
            );
        }  
    }
}

export default connect()(CardItem);