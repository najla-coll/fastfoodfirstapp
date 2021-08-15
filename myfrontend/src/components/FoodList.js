import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';
import Footer from './Footer';


import FoodCard from './FoodCard';
import { getProducts } from '../redux/actions/productAction';
import Show from './Show';

const FoodList = () => {
    const productList = useSelector(state => state.productList);
    const {loading , error , products} = productList;
    const dispatch = useDispatch()

    useEffect(() => {
         dispatch(getProducts())
    }, [dispatch])

        return (
        <div >
            <Show/>
            {loading ? <Loading /> : error ? <Error>{error}</Error>: <div className='liste'>
             {products.map(el=>
             <Link to={`/product/${el._id}`} style={{textDecorationLine:'none'}}>
               <FoodCard key= {el._id} data={el} />
             </Link>   
            )}</div>}       
            <Footer/>
        </div>
    )
}

export default FoodList
