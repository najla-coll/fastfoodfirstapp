import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrderUser, listOrderMine } from '../redux/actions/orderAction';
import Loading from './Loading';
import Error from './Error';
import {Button} from 'react-bootstrap'

import { ORDER_DELETE_USER_RESET } from '../redux/constants/orderConstants';


const OrderHistory = (props) => {
   

    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading, error, orders } = orderMineList;

    const orderDeleteUser = useSelector((state) => state.orderDeleteUser);
    const {
    loading: loadingDeleteUser,
    error: errorDeleteUser,
    success: successDeleteUser,
  } = orderDeleteUser;

    const dispatch = useDispatch();
    useEffect(() => {
     
      dispatch({ type: ORDER_DELETE_USER_RESET })
     
      dispatch(listOrderMine());
    }, [dispatch,successDeleteUser]);

    const deleteHandler = (order) => {
      if (window.confirm('Are you sure to delete?')) {
          dispatch(deleteOrderUser(order._id));
        }
    };

    return (
        <div>
             <h1>Order History</h1>
             {loadingDeleteUser && <Loading/>}
      {errorDeleteUser && <Error variant="danger">{errorDeleteUser}</Error>}
      {loading ? (
        <Loading/>
      ) : error ? (
        <Error variant="danger">{error}</Error>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                  <Button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(order)}
                    style={{marginLeft:'10Px'}}
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

export default OrderHistory
