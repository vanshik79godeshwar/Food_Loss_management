const express=require('express')
const router=express.Router()
const wrapAsync=require('../Utils/wrapAsync.js')
const {fetchProduct,createProducts}=require("../controllers/productRetailerController.js")
 
// Fetch products for retailer 
router.get('/:id/products',wrapAsync(fetchProduct));
router.post('/:id/products',wrapAsync(createProducts));

module.exports=router;