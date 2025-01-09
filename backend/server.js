const express=require('express')
require('dotenv').config()
const app=express();
const port=3000;
const connect_db = require('./connect_db');

// Middlewares.
app.use(express.urlencoded({extended:true}))
app.use(express.json());


// Routes



// Error handling.
app.use((err,req,res,next)=>{
    console.log(err);
    return res.status(500).json({message:'Internal Server Error!'})
})

connect_db();

app.listen(port,()=>{
    
    console.log('App is listening on port successfully :)');
})




