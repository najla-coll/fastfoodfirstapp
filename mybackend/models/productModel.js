const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   
    name:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:true,
        
    },
    prix:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }


},{timestamps:true});

const Product = mongoose.model('Product',productSchema);
module.exports = Product 