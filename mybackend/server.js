const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

require('dotenv').config()
const path = require('path')

//////////////////////////

const connectDB = require('./connectinDB');
connectDB()

////////////////////////

const userRoute = require('./router/userRoute');
app.use('/api/users',userRoute)


////////////////////////////

const productsRouter = require('./router/productsRouter');
app.use('/api/products',productsRouter);

////////////////////////////

const orderRouter = require('./router/orderRouter');
app.use('/api/orders',orderRouter)
///////////////////

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
  
////////////////////////////////////

const uploadRouter = require('./router/uploadRouter');
app.use('/api/uploads', uploadRouter)
const __myvar = path.resolve();
app.use('/uploads', express.static(path.join(__myvar, '/uploads')));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__myvar,'/myfrontend/build')));
    app.get('*', (req, res) =>
    res.sendFile(path.resolve(__myvar, 'myfrontend','build','index.html'))
  );
}else {
    app.get('/',(req,res)=>{
        res.send('API is running')
    })
}
///////////////////////////////


app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})


/////////////////////////////////////////////////////////////////////// 
app.listen(port,()=>{
    console.log(`app is running at http://localhost:${port}`)})