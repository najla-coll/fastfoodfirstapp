import React ,{useState} from 'react';
import { Form , Button} from 'react-bootstrap';
import Checkout from './Checkout';
import {useDispatch,useSelector} from 'react-redux';
import { savePayment } from '../redux/actions/cartAction';




const Payment = (props) => {
    const cart = useSelector((state) => state.cart);
    const { shipping } = cart;
   if (!shipping.address) {
    props.history.push('/shipping');
   }
    const [payment, setPayment] = useState('paypal')
    const dispatch = useDispatch()
    const submitHandler =(e)=>{
        e.preventDefault();
        dispatch(savePayment(payment));
        props.history.push('/placeOrder')
    }
    return (
        <div >
            
            <Checkout  step1 step2 step3 />
            <div className='payment'>
            <>
            <Form onSubmit={submitHandler}>
             <Form.Check type="radio" aria-label="radio 1" 
              id="paypal"
              value="paypal"
              name="payment"
              required
              checked
              onChange={(e) => setPayment(e.target.value)} />
              <Form.Label >Paypal</Form.Label>

              <Form.Check type="radio" aria-label="radio 1" 
              id="on delivery"
              value="on delivery"
              name="payment"
              onChange={(e) => setPayment(e.target.value)} />
              <Form.Label >on delivery</Form.Label> 
              <Button variant="primary" type="submit"  style={{marginLeft:'50Px'}}>
              Continue
              </Button>
            
             </Form>
             
             </>
            
             
            </div>
        </div>
    )
}

export default Payment
