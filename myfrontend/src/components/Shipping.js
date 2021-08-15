import React ,{useState} from 'react';
import Checkout from './Checkout';
import {useDispatch , useSelector} from 'react-redux';
import {Form , Row ,  Col , Button} from 'react-bootstrap';
import {saveShipping} from '../redux/actions/cartAction'

const Shipping = (props) => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { shipping } = cart;
    if (!userInfo) {
        props.history.push('/signin');
      }

    const [fullName,setFullName] = useState(shipping.fullName);
    const [address,setAddress] = useState(shipping.address);
    const [city,setCity] = useState(shipping.city);
    const [postalCode,setPostalCode] = useState(shipping.postalCode);
    const [tel,setTel] = useState(shipping.tel);
    const [country,setCountry] = useState(shipping.country);

    const dispatch = useDispatch()

    const submitHandler = (e) => {
       e.preventDefault();
       dispatch(saveShipping({fullName,address,city,postalCode , country,tel}))
       props.history.push('/payment');
    
    }
    return (
        <div >
            <Checkout   step1 step2/>
            <div className='shipping'>
            <Form onSubmit={submitHandler}>

            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridfullName">
            <Form.Label htmlFor='fullName'>fullName</Form.Label>
            <Form.Control type="text" placeholder="Enter fullName "  id='fullName' value={fullName} onChange={e=>setFullName(e.target.value)} required/>
            </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridfullName">
            <Form.Label htmlFor='tel'>Tel</Form.Label>
            <Form.Control type="text" placeholder="Enter Tel number "  id='tel' value={tel} onChange={e=>setTel(e.target.value)} required/>
            </Form.Group>
            </Row>

            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridAddress">
            <Form.Label htmlFor='Address'>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address "  id='Address' value={address} onChange={e=>setAddress(e.target.value)} required/>
            </Form.Group>
            </Row>

            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
            <Form.Label htmlFor='city'>City</Form.Label>
            <Form.Control type="text" placeholder="Enter City "  id='City' value={city} onChange={e=>setCity(e.target.value)} required/>
            </Form.Group>
            </Row>

            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPostalCode">
            <Form.Label htmlFor='Postal Code'>Postal Code</Form.Label>
            <Form.Control type="text" placeholder="Enter Postal Code "  id='Postal Code' value={postalCode} onChange={e=>setPostalCode(e.target.value)} required/>
            </Form.Group>
            </Row>

            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCountry">
            <Form.Label htmlFor='Country'>Country</Form.Label>
            <Form.Control type="text" placeholder="Enter Country "  id='Country' value={country} onChange={e=>setCountry(e.target.value)} required/>
            </Form.Group>
            </Row>
           
          <Button variant="primary" type="submit">
           Continue
          </Button>
        </Form>
     </div>
 </div>
    )
}

export default Shipping
