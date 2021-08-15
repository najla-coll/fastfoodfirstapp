import React from 'react';
import {Card,ListGroup,ListGroupItem ,Button,Form} from 'react-bootstrap';
import { useSelector } from 'react-redux';


const ProfileHome = (props) => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;


   
    return (
      <div>
        <div className='profilehome'>
          <Card style={{ width: '25rem' }}>
          <Card.Img variant="top" src={userInfo.image} />
          <Card.Body>
          <Form.Label htmlFor='firsttName'>First Name :</Form.Label>
          <Card.Title>{userInfo.firstName}</Card.Title>
          <Form.Label htmlFor='lastName'>Last Name :</Form.Label>
          <Card.Text>
           {userInfo.lastName}
          </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
          <Form.Label htmlFor='email'>Email :</Form.Label>
          <ListGroupItem>{userInfo.email}</ListGroupItem>
          <Form.Label htmlFor='Tel'>Tel :</Form.Label>
          <ListGroupItem>{userInfo.tel}</ListGroupItem>
         
          </ListGroup>
          {/* <Card.Body>
    
         <Card.Link href="/profile">Update</Card.Link>
         </Card.Body> */}
        </Card> 
        </div>
        <Button  style={{marginLeft:'670Px' ,marginTop:'20Px'}} onClick={() => {
                      props.history.push('/profile')}}>Edit</Button>
        
         </div>
            
    )
}

export default ProfileHome
