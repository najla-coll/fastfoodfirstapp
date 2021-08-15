import React , {useEffect}from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { deleteUser, getUser } from '../redux/actions/userAction';
import Loading from './Loading';
import Error from './Error';
import {Button} from 'react-bootstrap'
import { USER_DELETE_RESET } from '../redux/constants/userConstants';

const UserList = (props) => {
const userList = useSelector(state => state.userList);
const { loading, error, user } = userList;

const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

const dispatch = useDispatch();

const deleteHandler = (user) => {
  if (window.confirm('Are you sure to delete?')) {
    dispatch(deleteUser(user._id));
  }
}


useEffect(() => {
  if (successDelete) {
    dispatch({ type: USER_DELETE_RESET });
  }
    dispatch(getUser());
}, [dispatch,successDelete])
    return (
        <div>
       
        <h1>Users</h1>
      
      {loadingDelete && <Loading/>}
      {errorDelete && <Error variant="danger">{errorDelete}</Error>}
    
      {loading ? (
        <Loading/>
      ) : error ? (
        <Error variant="danger">{error}</Error>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>firstName</th>
              <th>email</th>
              
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr key={user._id} >
                <td>{user._id}</td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                
                <td>
            
                  <Button
                    type="button"
                    style={{marginLeft:'10Px'}}
                    className="small"
                    onClick={() => deleteHandler(user)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    )
}

export default UserList
