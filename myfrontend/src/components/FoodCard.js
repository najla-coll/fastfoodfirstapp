import React from 'react'
import {Card,ListGroup ,ListGroupItem} from 'react-bootstrap';

import Rating from './Rating'

const FoodCard = ({data}) => {
    return (
        <div className='listedetail'>
          
            <Card style={{ width: '18rem' ,color:'black'}}>
            <Card.Img variant="top" src={data.image} style={{ width: '285px', height: '180px' }} />
            <Card.Body  >
            <Card.Title >{data.name}</Card.Title>
            <Card.Text>
            {data.description}
            </Card.Text>
            </Card.Body>
  
   
            <Rating  rate={data.rating}/>
    
            <ListGroup className="list-group-flush">
            <ListGroupItem>{data.prix}</ListGroupItem>
            </ListGroup>
            <Card.Body>
            <Card.Link href="#">View</Card.Link>
   
           </Card.Body>
           </Card>

        </div>
    )
}

export default FoodCard
