const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    expiry_date:{
        type: Date,
        required: true,
        trim: true
    },
    discount: {
        type: Number,
        default: 0
    },
    retailer_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product_image:{
        type: String,
        trim: true
    },
    category:{
        type: String,
        required: true,
        trim: true
    }
},{timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;