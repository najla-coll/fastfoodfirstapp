import Axios from "axios"
import { CART_ADD, CART_REMOVE, CART_SAVE_SHIPPING , CART_SAVE_PAYMENT} from "../constants/cartConstants";


export const addToCart = (productId,qty) => async (dispatch , getState) =>{
  const {data} = await Axios.get(`/api/products/${productId}`);
  dispatch({
      type:CART_ADD,
      payload:{
          name:data.name,
          image:data.image,
          prix:data.prix,
          product:data._id,
          qty,

      }
  });
  localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (productId) => async (dispatch , getState) =>
{
  dispatch({
    type:CART_REMOVE,
    payload:productId
  });
  localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}


export const saveShipping = (data) => async (dispatch) =>
{
  dispatch({
    type:CART_SAVE_SHIPPING,
    payload: data
  });
  localStorage.setItem('shipping',JSON.stringify(data))
}

export const savePayment = (data) => async (dispatch) =>
{
  dispatch({
    type:CART_SAVE_PAYMENT,
    payload: data
  });
}