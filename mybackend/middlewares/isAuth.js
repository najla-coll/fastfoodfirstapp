//1-require jsonwebtoken
const jwt = require('jsonwebtoken')

//2-require user schema 
const User = require('../models/userModel')

 const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); 
      jwt.verify(
        token,
        process.env.JWT_SECRET || 'secret',
        (err, decode) => {
          if (err) {
            res.status(401).send({ message: 'Invalid Token' });
          } else {
            req.user = decode;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: 'No Token' });
    }
  };



module.exports =isAuth