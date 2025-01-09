const express=require('express');
const router=express.Router();
const wrapAsync=require('../Utils/wrapAsync.js');
const {getAllProducts}=require('../controllers/productCustomerController.js');

router.get('/',wrapAsync(getAllProducts));

module.exports=router;