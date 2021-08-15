const express = require('express');
const router = express.Router();

const Product = require('../models/productModel');
const data = require('../data');
const expressAsyncHandler = require('express-async-handler');
const isAdmin = require('../middlewares/isAdmin');
const isAuth = require('../middlewares/isAuth')


router.get('/',expressAsyncHandler(async (req,res)=>{
    const products = await Product.find({});
    res.send(products)
}))


router.get('/seed',expressAsyncHandler(async(req,res)=>{
    
     const createdProducts = await Product.insertMany(data.products);
     res.send({createdProducts})
}));


router.get('/:id',expressAsyncHandler(async (req, res) => {
  
    const product = await Product.findById(req.params.id)
      
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
  
     
    })
);

router.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'pizza10 ' + Date.now(),
      image: '/images/p1.jpg',
      prix: 0,
      
      rating: 0,
     
      description: 'sample description',
    });
    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
  })
);

router.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.prix = req.body.prix;
      product.image = req.body.image;
     
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
module.exports = router