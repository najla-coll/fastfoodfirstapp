import React, { useState ,useEffect} from 'react';
import {Form,Button} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux'
import {Link}  from 'react-router-dom';
import {register } from '../redux/actions/userAction';
import Loading from './Loading';



const Register = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const redirect = props.location.search
      ? props.location.search.split('=')[1]
      : '/';
  
    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, errors } = userRegister;
    

    const dispatch = useDispatch()

    const submitHandler =(e)=>{
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and confirm password are not match');
          } else {
            dispatch(register(firstName,lastName, email, password,tel));
          }
    }


    useEffect(() => {
        if (userInfo) {
          props.history.push(redirect);
        }
      }, [props.history, redirect, userInfo]);

    return (
        <div className='register'>
            
            <Form onSubmit={submitHandler}>
            {loading && <Loading />}
            <div className='errormap'>
            {errors && errors.map(el => <p> {el.msg} </p>) }
            </div>
            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label htmlFor='firstName'>First Name</Form.Label>
            <Form.Control type="text" placeholder="firstName" id ="firstName"  onChange={(e)=>setFirstName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label htmlFor='lastName'>Last Name</Form.Label>
            <Form.Control type="text" placeholder="lastName" id ="lastName"  onChange={(e)=>setLastName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label htmlFor='tel'>Tel</Form.Label>
            <Form.Control type="text" placeholder="tel" id ="tel"  onChange={(e)=>setTel(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label htmlFor='email'>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" id ="email"  onChange={(e)=>setEmail(e.target.value)}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" id ="password"  onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label htmlFor='confirmPassword'>confirm Password</Form.Label>
            <Form.Control type="password" placeholder="confirm Password" id ="confirmPassword"  onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </Form.Group>
  
            <Button variant="primary" type="submit">
             Submit
            </Button>
            <Form.Text className="text-muted">
            Already have an account?{' '} <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
           
            </Form.Text>
            </Form>
        </div>
    )
}

export default Register
