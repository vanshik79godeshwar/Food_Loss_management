const express=require('express')
const userRoutes=require('./routes/userRoutes.js')
require('dotenv').config()
const app=express();
const port=3000;

// Middlewares.
app.use(express.urlencoded({extended:true}))
app.use(express.json());


// Routes
app.use('/user',userRoutes);

// Error handling.
app.use((err,req,res,next)=>{
    console.log(err);
    return res.status(500).json({message:'Internal Server Error!'})
})

app.listen(port,()=>{
    console.log('App is listening on port successfully :)');
})




