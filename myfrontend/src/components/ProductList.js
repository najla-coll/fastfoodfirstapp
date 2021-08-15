import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts ,  createProduct ,  deleteProduct} from '../redux/actions/productAction';
import {PRODUCT_CREATE_RESET , PRODUCT_DELETE_RESET} from '../redux/constants/productConstants'
import Loading from './Loading';
import {Button} from 'react-bootstrap'
import Error from './Error';

export default function ProductList(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;


  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (successCreate) {
        dispatch({ type: PRODUCT_CREATE_RESET });
        props.history.push(`/product/${createdProduct._id}/edit`);
      }
    if (successDelete) {
        dispatch({ type: PRODUCT_DELETE_RESET });
      }
    dispatch(getProducts());
  }, [createdProduct, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  }

  const createHandler = () => {
    dispatch(createProduct());
  };


  return (
    <div>
       
        <h1>Products</h1>
        <br/>
        <Button type="button" className="primary" onClick={createHandler}>
          Create Product
        </Button>
        <br/>
        <br/>
      {loadingDelete && <Loading/>}
      {errorDelete && <Error variant="danger">{errorDelete}</Error>}
      {loadingCreate && <Loading/>}
      {errorCreate && <Error variant="danger">{errorCreate}</Error>}
      {loading ? (
        <Loading/>
      ) : error ? (
        <Error variant="danger">{error}</Error>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRIX</th>
              
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} >
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.prix}</td>
                
                <td>
                  <Button
                    type="button"
                    className="small"
                    
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    Edit
                  </Button>
                 
                  <Button
                    type="button"
                    style={{marginLeft:'10Px'}}
                    className="small"
                    onClick={() => deleteHandler(product)}
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
