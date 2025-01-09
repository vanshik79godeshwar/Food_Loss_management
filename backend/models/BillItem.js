const mongoose = require('mongoose');

const billItemSchema = new mongoose.Schema({
    bill_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill',
        required: true
    },
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        trim: true
    },
    total_amount:{
        type: Number,
        required: true,
        trim: true
    }
},{timestamps: true});

const BillItem = mongoose.model('BillItem', billItemSchema);

module.exports = BillItem;