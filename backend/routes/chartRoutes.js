const express = require('express');
const router = express.Router();

const { getPriceDistribution, getRetailerDistribution, getDiscountData, getDaysUntilExpiry } = require('../controllers/chartController');

// Price distribution route
router.get('/price-distribution', getPriceDistribution);

// Retailer distribution route
router.get('/retailer-distribution', getRetailerDistribution);

// Discount vs Price route
router.get('/discount-data', getDiscountData);

// Days Until Expiry route
router.get('/days-until-expiry', getDaysUntilExpiry);

module.exports = router;
