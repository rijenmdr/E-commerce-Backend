const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

//routes
const blogRoutes = require('./routes/blog');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const tagRoutes = require('./routes/tag');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/blog', blogRoutes);
app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/tag', tagRoutes);

//error
app.all('*',(req,res,next)=>{
    const err = new Error('Cannot fetch the requested resources');
    err.status= "fail";
    err.statusCode = 404;
    next(err)
  })
  
  app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    err.message = err.message || 'Internal Server Error'
    
    res.status(err.statusCode).json({
      status:err.statusCode,
      statusMessage: err.status,
      message:err.message
    })
  })

//db-connection
mongoose.connect(
    `mongodb+srv://rijen:rijensayami00438@cluster0.dp2qi.mongodb.net/Freshnesecom?retryWrites=true&w=majority`,
).then(req => {
    app.listen(port, () => {
        console.log(`Ecommerce app listening to port ${port}`)
    })
}).catch(err => {
    console.log("Connection Error", err)
})

