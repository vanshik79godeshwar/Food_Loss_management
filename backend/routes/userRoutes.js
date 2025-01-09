const express=require('express')
const router=express.Router();
const {login,signUp}=require('../controllers/userController.js')
const wrapAsync=require('../Utils/wrapAsync.js')

router.use('/login',wrapAsync(login));
router.use('/signup',wrapAsync(signUp));

module.exports=router;