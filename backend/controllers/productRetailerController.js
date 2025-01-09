// Function for creating products for retailer.
const Products = require("../models/Product.js");

const fetchProduct = async (req, res, next) => {
  const userId = req.params.userId;
  if (!userId) throw new Error("User Not found!");

  const products = await Products.find({ retailer_id: userId });

  return res.status(200).json(products);
};

// Function for getting products for particular retailer.
const createProducts = async (req, res, next) => {
  const userId = req.params.userId;
  if (!userId) throw new Error("User Not found!");

  const { name, price, expiry_date, discount, retailer_id, category } =
    req.body;

  if (!name || !price || !expiry_date || !discount || !retailer_id || !category)
    throw new Error("Data not found!");

  const product=new Products(req.body);
  return res.status(200).json(product);
};

module.exports = { fetchProduct, createProducts };
