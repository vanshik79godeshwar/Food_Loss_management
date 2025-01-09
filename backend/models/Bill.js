const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    order_id:{
        type: String,
        required: true,
        trim: true
    },
    done:{
        type: Boolean,
        default: false
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;