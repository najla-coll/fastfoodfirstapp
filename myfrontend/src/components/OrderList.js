import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders, deleteOrder} from '../redux/actions/orderAction';
import Loading from './Loading';
import Error from './Error';
import { ORDER_DELETE_RESET } from '../redux/constants/orderConstants';
import {Button} from 'react-bootstrap'


const OrderList = (props) => {

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders());
  }, [dispatch, successDelete]);
  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
        dispatch(deleteOrder(order._id));
      }
  };

    return (
        <div>

      <h1>Orders</h1>
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
              <th>USER</th>
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
                <td>{order.shipping.fullName}</td>
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
                    style={{marginLeft:'10Px'}}
                    onClick={() => deleteHandler(order)}
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
  );
}
export default OrderList
