import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsDetail  , updateProduct } from '../redux/actions/productAction';
import {Button} from 'react-bootstrap'
import Axios from 'axios';
import Loading from './Loading';
import Error from './Error';
import { PRODUCT_UPDATE_RESET } from '../redux/constants/productConstants';

const ProductEdit = (props) => {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [prix, setPrix] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const productDetail = useSelector((state) => state.productDetail);
    const { loading, error, product } = productDetail;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = productUpdate;
  
    const dispatch = useDispatch();

    useEffect(() => {
      if (successUpdate) {
        props.history.push('/productlist');
      }
      if (!product || product._id !== productId || successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
          dispatch(getProductsDetail(productId));
        } else {
          setName(product.name);
          setPrix(product.prix);
          setImage(product.image);
          
          setDescription(product.description);
        }
      }, [product, dispatch, productId, successUpdate, props.history]);

      const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
          updateProduct({
            _id: productId,
            name,
            prix,
            image,
            description,
          })
        );
      };


      const [loadingUpload, setLoadingUpload] = useState(false);
      const [errorUpload, setErrorUpload] = useState('');
    
      const userSignin = useSelector((state) => state.userSignin);
      const { userInfo } = userSignin;
      const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
          const { data } = await Axios.post('/api/uploads', bodyFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${userInfo.token}`,
            },
          });
          setImage(data);
          setLoadingUpload(false);
        } catch (error) {
          setErrorUpload(error.message);
          setLoadingUpload(false);
        }
      };
    
    return (
        <div>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1 style={{fontSize:'medium'}}>Edit Product {productId}</h1>
          </div>
          {loadingUpdate && <Loading/>}
          {errorUpdate && <Error variant="danger">{errorUpdate}</Error>} 
          {loading ? (
            <Loading/>
          ) : error ? (
            <Error variant="danger">{error}</Error>
          ) : (
            <>
            <div className='card upprofile'>
              <div>
                <label htmlFor="name">Name :</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
                 <br/>
          
              <div>
                <label htmlFor="price">Price :</label>
                <input
                  id="price"
                  type="text"
                  placeholder="Enter price"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                ></input>
              </div>
              <br/>
              <div>
                <label htmlFor="image">Image :</label>
                <input
                  id="image"
                  type="text"
                  placeholder="Enter image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </div>
              <br/>
              <div>
              <label htmlFor="imageFile">Image File :</label>
              <br/>
              <br/>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <Loading/>}
              {errorUpload && (
                <Error variant="danger">{errorUpload}</Error>
              )}
            </div>
              <br/>
              <br/>
              
              <div>
                <label htmlFor="description">Description :</label>
                <br/>
                <br/>
                <textarea
                  id="description"
                  cols="72" rows="5"
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label></label>
                <Button className="primary" type="submit" style={{marginLeft:'100Px'}}>
                  Update
                </Button>
              </div>
              </div>
            </>
          )}
        </form>
      </div>
    );
}

export default ProductEdit
