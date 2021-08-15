import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';
import  { productCreateReducer, productDetailReducer ,  productListReducer  , productUpdateReducer , productDeleteReducer} from './reducers/productReducer';
import { userDeleteReducer, userDetailsReducer, UserListReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer  } from './reducers/userReducer';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer , orderListReducer , orderDeleteReducer ,orderDeliverReducer, orderDeleteUserReducer} from './reducers/orderReducers';


const initial = {
      userSignin: {
            userInfo: localStorage.getItem('userInfo')
              ? JSON.parse(localStorage.getItem('userInfo'))
              : null,
          },
      cart:{
            cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [] ,
            shipping:localStorage.getItem('shipping')
            ? JSON.parse(localStorage.getItem('shipping'))
            : {},
            payment:'paypal'
      },
      
}

const reducer = combineReducers({
      productList : productListReducer,
      productDetail : productDetailReducer,
      cart : cartReducer,
      userSignin: userSigninReducer,
      userRegister:userRegisterReducer,
      orderCreate: orderCreateReducer,
      orderDetails: orderDetailsReducer,
      orderPay: orderPayReducer,
      orderMineList: orderMineListReducer,
      userDetails: userDetailsReducer,
      userUpdateProfile: userUpdateProfileReducer,
      productCreate: productCreateReducer,
      productUpdate: productUpdateReducer,
      productDelete: productDeleteReducer,
      orderList: orderListReducer,
      orderDelete: orderDeleteReducer,
      orderDeleteUser: orderDeleteUserReducer,
      orderDeliver: orderDeliverReducer,
      userList : UserListReducer,
      userDelete: userDeleteReducer,
     
      
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
     reducer,
     initial ,
     composeEnhancers(applyMiddleware(thunk)
  ));

export default store  