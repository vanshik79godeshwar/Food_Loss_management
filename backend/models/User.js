const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    // email userId username profilePic
    email:{
        type:String
    },
    username:{
        type:String
    },
    profilePic:{
        type:String
    },
    type:{
        type:String,
        enum:['retailer','customer']
    }
},)
const User=mongoose.model('User',userSchema)

module.exports= User;