import React, { useState ,useEffect} from 'react';
import {Form,Button} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux'
import {Link}  from 'react-router-dom';
import {signin} from '../redux/actions/userAction';
import Loading from './Loading';
import Error from './Error'



const Signin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

   const userSignin = useSelector((state) => state.userSignin);
   const { userInfo, loading, error } = userSignin;
    
    const dispatch = useDispatch()

    const submitHandler =(e)=>{
        e.preventDefault();
        dispatch(signin(email, password));
    }

    useEffect(() => {
      if (userInfo) {
        props.history.push(redirect);
      }
    }, [props.history, redirect, userInfo]);


    return (
        <div className='signin'>
            
            <Form onSubmit={submitHandler}>
            {loading && <Loading />}
            <div className='errormap'>
            {error && <Error variant="danger">{error}</Error>}
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label htmlFor='email'>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" id ="email"  onChange={(e)=>setEmail(e.target.value)}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label htmlFor='email'>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" id ="email"  onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
  
            <Button variant="primary" type="submit">Submit
            </Button>
           
            <Form.Text className="text-muted">
              New Customer ? <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
            </Form.Text>
            </Form>
        </div>
    )
}

export default Signin
