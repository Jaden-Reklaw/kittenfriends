import React from 'react';

//Import Bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CardItem = ({name, email, id}) => {
    return (
        <Card 
            style={{ width: '18rem', display:'inline-block', margin:'12px'}} 
            className="text-center shadow p-3 mb-5 bg-white rounded"
        >
            <Card.Img variant="top" src={`https://robohash.org/${id}?200x200`} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                {email}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default CardItem;