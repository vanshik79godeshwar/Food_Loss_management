const express=require('express')
const router=express.Router({mergeParams:true})
const wrapAsync=require('../Utils/wrapAsync.js')
const {fetchProduct,createProducts}=require("../controllers/productRetailerController.js")
 
// Fetch products for retailer 
router.get('/',wrapAsync(fetchProduct));
router.post('/',wrapAsync(createProducts));

module.exports=router;