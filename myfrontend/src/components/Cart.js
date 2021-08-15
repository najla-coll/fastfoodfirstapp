import React , {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { addToCart, removeFromCart} from '../redux/actions/cartAction';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap'


const Cart = (props) => {
    const productId = props.match.params.id;
    const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
    
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const dispatch = useDispatch();

    useEffect(() => {
      if(productId){
         dispatch(addToCart(productId,qty))  
      }
    }, [productId,qty,dispatch]);

    const removeFromCartHandler = (id) =>{
      dispatch(removeFromCart(id))
    }
    
    const checkOutHandler = () => {
       props.history.push('/signin?redirect=shipping')
    }

    
    return (
        <div className='cartWidth'>
            <div className='cartProduct'>
            <h1>Cart</h1>
            
            {cartItems.length === 0 ? (<h3 className='error'> Cart is Empty .  <Link to='/'> Go To Home</Link> </h3>) : (
                <ul className='cartdetail'>
                    {cartItems.map(el=> (
                       
                        <li key={el.product} className='cartList'>
                             <img src ={el.image} alt ={el.name}  className='small'/>
                             <div  style={{width:'230Px'}}>
                              <Link to={`/product/${el.product}`}>
                               {el.name}
                              </Link>
                             </div>
                             <div>
                              <select  value={el.qty}  onChange={e=>dispatch(addToCart(el.product,Number(e.target.value)))}>
                              <option >1</option>
                              <option >2</option>
                              <option >3</option>
                              <option >4</option>
                              <option >5</option>
                              <option >6</option>
                              </select>  
                             </div>
                             <div>{el.prix}</div>
                             <div>
                                 <Button onClick={()=>removeFromCartHandler(el.product)}>Delete</Button>
                             </div>

                        </li>
                        
                    ))}
                </ul>
            )}
            </div>
            <div className='subTotalBloc'>
               <ul>
                 <li>
                    <h2>SubTotal:</h2>
                    <h4>
                    {cartItems.reduce((a,c)=>a + c.qty , 0)} items : ${cartItems.reduce((a,c)=>a + c.prix * c.qty , 0)}</h4>
                 </li>
                 <li>
                     <Button onClick={checkOutHandler}  disabled={cartItems.length === 0}>CheckOut</Button>
                 </li>

               </ul>
            </div>
        </div>
    )
}

export default Cart
