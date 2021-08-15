import React,{useEffect,useState}  from 'react';
import {useSelector , useDispatch} from 'react-redux'
import Loading from './Loading';
import Error from './Error'
import {Card,ListGroup,ListGroupItem,Button}from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Rating from './Rating'
import { getProductsDetail } from '../redux/actions/productAction';

const FoodDetail = (props) => {
   
    const productDetail = useSelector(state => state.productDetail);
    const {loading , error ,product} = productDetail;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1)
    
    

    useEffect(() => {
       dispatch(getProductsDetail(productId))
    }, [dispatch,productId])

    const CartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
        
       
    }
    
    return (
          
      <div>

            {loading ? <Loading /> : error ? <Error error={error}  variant='danger'/> :
            <div className='description'>
          
            <div className='carte'>
            <Link to ='/'>Back</Link>
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              {product.description}
            </Card.Text>
            </Card.Body>
            <Rating  rate={product.rating}/>
            <ListGroup className="list-group-flush">
            <ListGroupItem>{product.prix}</ListGroupItem>
           </ListGroup>
           <Card.Body>
           <Card.Link href="#">View</Card.Link>
   
          </Card.Body>
          </Card>
           </div>
           <div className="qty">
           
           <label >Choose Quantity:</label>
           <select value={qty} onChange={ (e) => setQty(e.target.value)}>
           <option>--Please choose Qty--</option>
           <option >1</option>
           <option >2</option>
           <option >3</option>
           <option >4</option>
           <option >5</option>
           <option >6</option>
          </select>
         <Button onClick={CartHandler} disabled={userInfo && userInfo.isAdmin}>ADD TO CART</Button>
         </div>
         </div>}       
        
        </div>


        
        
    )
}

export default FoodDetail
