import { CART_ADD, CART_REMOVE ,CART_SAVE_SHIPPING , CART_SAVE_PAYMENT, CART_EMPTY} from "../constants/cartConstants";


export const cartReducer = (state = {cartItems:[]} , action) => {
    switch (action.type) {
        case CART_ADD:
            const item = action.payload ;
            const exist = state.cartItems.find(el=>el.product === item.product);
            if(exist){
                return{
                    ...state,cartItems:state.cartItems.map(x=>x.product === exist.product ? item : x)
                }
            }else{
                return{
                    ...state,cartItems:[...state.cartItems,item]
                }
            }
        case CART_REMOVE:
           return {...state,cartItems:state.cartItems.filter(x=>x.product !== action.payload)};
        case CART_SAVE_SHIPPING:
           return {...state, shipping: action.payload };
        case CART_SAVE_PAYMENT:
           return {...state, payment: action.payload };
        case CART_EMPTY:
            return { ...state, cartItems: [] };
    
        default:
           return state;
    }
}