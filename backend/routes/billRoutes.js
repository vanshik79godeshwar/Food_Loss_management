const express= require('express');
const router = express.Router();
const wrapAsync = require('../Utils/wrapAsync');
const { receivePayment,updatePayment } = require('../controllers/billController');

router.post('/',wrapAsync(receivePayment));
router.post('/razorpay',wrapAsync(updatePayment));

module.exports = router;