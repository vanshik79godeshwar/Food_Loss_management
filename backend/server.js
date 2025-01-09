const express=require('express')
const userRoutes=require('./routes/userRoutes.js')
const productCustomerRoutes=require('./routes/productCustomerRoutes.js')
const productRetailerRoutes=require("./routes/productRetailerRoutes.js");
const billRoutes=require('./routes/billRoutes.js')
require('dotenv').config()
const app=express();
const port=3000;
const connect_db=require('./connect_db.js')

// Middlewares.
app.use(express.urlencoded({extended:true}))
app.use(express.json());


// Routes
app.use('/products',productCustomerRoutes);
app.use('/:id/products',productRetailerRoutes);
app.use('/user',userRoutes);
app.use('/payment',billRoutes)


// Error handling.
app.use((err,req,res,next)=>{
    console.log(err);
    return res.status(500).json({message:'Internal Server Error!'})
})
connect_db();

app.listen(port,()=>{
    console.log('App is listening on port successfully :)');
})

