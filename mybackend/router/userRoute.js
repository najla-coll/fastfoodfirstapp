
const data = require('../data');
const expressAsyncHandler = require('express-async-handler');

const generateToken = require('../middlewares/utile')


//1-require express
const express = require('express')


//2-require user schema
const User = require('../models/userModel')

//3-require router from express
const router = express.Router()


//4-require bcrypt
const bcrypt = require('bcryptjs')

//5-require jsonwebtoken
const jwt = require('jsonwebtoken')

const isAuth  = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin');



router.get('/seed', 

   expressAsyncHandler(async(req,res)=>{
    // await User.deleteMany({});
    const createdUsers = await User.find({});
    res.send(createdUsers);
}));

router.post('/signin',expressAsyncHandler(async(req,res)=>{

    const user = await User.findOne({email:req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password , user.password)){
            res.send(
                {
                    _id:user._id,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email,
                   
                    tel:user.tel,
                    image:user.image,
                    isAdmin:user.isAdmin,
                    token:generateToken(user)
                }
            )
            return;
        }
    }
    res.status(401).send({message:'Invalid email or password'})
}))


////////////////////////////
router.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
     
      tel:req.body.tel,
      image:req.body.image,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
     
      tel:createdUser.tel,
      image:createdUser.image,
      password: createdUser.password,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

router.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
       
      const user = await User.findById(req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );

 router.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id);
      if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        
        user.tel = req.body.tel || user.tel;
        user.image = req.body.image || user.image;
        user.email = req.body.email || user.email;
       
        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, 8);
          
        }
        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
         
          tel:updatedUser.tel,
          image:updatedUser.image,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser),
       
        });
      }
    })
  );  

  //////////////////////////////

  router.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        const deleteUser = await user.remove();
        res.send({ message: 'user Deleted', user: deleteUser });
      } else {
        res.status(404).send({ message: 'user Not Found' });
      }
    })
  );

module.exports = router