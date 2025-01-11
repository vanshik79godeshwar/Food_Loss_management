const Products = require("../models/Product.js");

const fetchProduct = async (req, res, next) => {
  const {id} = req.params;
  if (!id) throw new Error("User Not found!");

  const products = await Products.find({ retailer_id: id });
  return res.status(200).json(products);
};

// Function for getting products for particular retailer.
const createProducts = async (req, res, next) => {
  const {id} = req.params;
  if (!id) throw new Error("User Not found!");

  const { name, price, expiry_date, discount, category,quantity, product_image, description } =
    req.body;
  const product = new Products({
    name,
    price,
    expiry_date,
    discount,
    retailer_id: id,
    category,
    product_image,
    description,
    quantity
  });
  await product.save();
  return res.status(200).json(product);
};

async function fetchProductDetails(req, res, next) {
  const productId = req.params.productId;
  if (!productId) throw new Error("Product not found!");
  const product = await Products.findById(productId);
  console.log(product); 
  return res.status(200).json(product);
}


module.exports = { fetchProduct, createProducts,fetchProductDetails };