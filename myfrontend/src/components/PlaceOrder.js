import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../redux/actions/orderAction';
import { ORDER_CREATE_RESET } from '../redux/constants/orderConstants';
import Loading from './Loading';
import Error from './Error';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

const PlaceOrder=(props) =>{
  const cart = useSelector((state) => state.cart);
  if (!cart.payment) {
    props.history.push('/payment');
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;


  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.prix, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(3);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  
  return (
    <div>
      <Checkout step1 step2 step3 step4/>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {cart.shipping.fullName} <br />
                  <strong>Address: </strong> {cart.shipping.address},
                  {cart.shipping.city}, {cart.shipping.postalCode}
                  ,{cart.shipping.country}<br/>
                  <strong>Tel:</strong> {cart.shipping.tel} <br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.payment}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.prix} = ${item.qty * item.prix}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <Button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </Button>
              </li>
              {loading && <Loading/>}
              {error && <Error>{error}</Error>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder
