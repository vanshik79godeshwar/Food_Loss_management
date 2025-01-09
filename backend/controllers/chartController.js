const Product = require('../models/Product');

const getPriceDistribution = async (req, res) => {
  try {
    const products = await Product.find({});
    
    const priceDistribution = products.reduce((acc, item) => {
      const priceRange = `₹${Math.floor(item.price / 100) * 100}-${Math.floor(item.price / 100) * 100 + 100}`;
      acc[priceRange] = (acc[priceRange] || 0) + 1;
      return acc;
    }, {});

    const priceDistributionData = Object.entries(priceDistribution).map(([range, count]) => ({
      range,
      count
    }));

    res.json(priceDistributionData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching price distribution data', error });
  }
};

const getRetailerDistribution = async (req, res) => {
    try {
      const products = await Product.find({});
      
      const retailerData = products.reduce((acc, item) => {
        acc[item.retailer_id] = (acc[item.retailer_id] || 0) + 1;
        return acc;
      }, {});
  
      const retailerPieData = Object.entries(retailerData).map(([name, value]) => ({
        name,
        value
      }));
      
      return res.json(retailerPieData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching retailer distribution data', error });
    }
  };

  const getDiscountData = async (req, res) => {
    try {
      const products = await Product.find({});
      const discountData = products.map(item => ({
        price: item.price,
        discount: item.discount
      }));
      
      return res.json(discountData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching discount vs price data', error });
    }
  };

  const getDaysUntilExpiry = async (req, res) => {
    try {
      const products = await Product.find({});
      const expiryData = products.map(item => ({
        name: item.name,
        daysUntilExpiry: Math.ceil((new Date(item.expiry_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      }));
  
      res.json(expiryData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching expiry data', error });
    }
  };
  

module.exports = {
  getPriceDistribution,
    getRetailerDistribution,
    getDiscountData,
    getDaysUntilExpiry,
};