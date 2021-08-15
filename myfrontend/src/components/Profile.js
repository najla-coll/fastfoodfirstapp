import React, { useEffect ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../redux/actions/userAction';
import Loading from './Loading';
import Error from './Error';
import {Button} from 'react-bootstrap'
import { USER_UPDATE_PROFILE_RESET } from '../redux/constants/userConstants';
import Axios from 'axios';

export default function Profile() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();
  
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
      
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setTel(user.tel);
      setImage(user.image);
    }
  }, [dispatch, userInfo._id, user]);


  
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(updateUserProfile({ userId:user._id,firstName,lastName,email, password ,tel,image}));
    }
     
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile Edit</h1>
        </div>
        {loading ? (
          <Loading/>
        ) : error ? (
          <Error variant="danger">{error}</Error>
        ) : (
          <>
          {loadingUpdate && <Loading/>}
            {errorUpdate && (
              <Error variant="danger">{errorUpdate}</Error>
            )}
            {successUpdate && (
              <Error variant="success">
                Profile Updated Successfully
              </Error>
            )}
    <div className='card upprofile'>
              <div>
                <label htmlFor="image">Image :</label>
                <input
                  className='input'
                  id="image"
                  type="text"
                  placeholder="Enter image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </div>
              <br/>
              <div>
              <label htmlFor="imageFile">Image File :</label>
              <input
                className='input'
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <Loading/>}
              {errorUpload && (
                <Error variant="danger">{errorUpload}</Error>
              )}
            </div>
            <br/>
            <div>
              <label htmlFor="name">First Name :</label>
              <input
                className='input'
                id="name"
                type="text"
                placeholder="Enter name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <br/>
            <div>
              <label htmlFor="name">Last Name :</label>
              <input
                className='input'
                id="name"
                type="text"
                placeholder="Enter name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
            <br/>
           
            <div>
              <label htmlFor="tel">Tel :</label>
              <input
                className='input'
                id="tel"
                type="text"
                placeholder="Enter Tel"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              ></input>
            </div>
            <br/>
            <div>
              <label htmlFor="email">Email :</label>
              <input
                className='input'
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <br/>
            <div>
              <label htmlFor="password">Password :</label>
              <input
                className='input'
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <br/>
            <div>
              <label htmlFor="confirmPassword">confirm Password :</label>
              <input
                className='input'
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <br/>
            <div>
              <label />
              <Button className="primary" type="submit">
                Update
              </Button>
            </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}