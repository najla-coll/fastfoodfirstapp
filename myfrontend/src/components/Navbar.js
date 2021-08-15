import './Navbar.css';
import React from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../redux/actions/userAction';

const Navbar = () => {
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    

    const dispatch = useDispatch();
    const signoutHandler = () => {
    dispatch(signout());
    };
    return (
        <div>
               <nav className="nav">
               <img  src="/logo.png" alt ="logo" />
               <ul className="link">
                  <li>
                    <Link to='/'>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to='/cart'>
                     <i className="fas fa-shopping-cart"></i>
                      Cart {cartItems.length > 0 && (<span>{cartItems.length}</span>)}
                    </Link>
                  </li>
                  <li>
                  {userInfo ? (
                   <div className="dropdown">
                   <Link to="#">
                   {userInfo.firstName} <i className="fa fa-caret-down"></i>
                   </Link>
                   <ul className="dropdown-content">
                   <li>
                    <Link to="/profilehome">User Profile</Link>
                  </li>
                   <li>
                    <Link to="/orderhistory">Order History</Link>
                   </li>
                   <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                   </li>
                   
                   </ul>
                  </div>
                   ) : (
                  <Link to="/signin">Sign In</Link>
                   )}
                   </li>
                   {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  
                </ul>
              </div>
            )}

              </ul>
              </nav>
        </div>
    )
}

export default Navbar
