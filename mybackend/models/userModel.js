const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    
    tel:{
        type:String
       
    },
    image:{
        type:String
        
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    }
},{timestamps : true})

const User = mongoose.model('User',userShema)

module.exports = User