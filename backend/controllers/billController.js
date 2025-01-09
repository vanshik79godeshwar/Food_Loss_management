const Bill = require('../models/Bill');
const BillItem = require('../models/BillItem');
const Razorpay = require('razorpay');
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
require('dotenv').config();

const initate = async (amount) => {

    var razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
    });

    //Payment
    let paymentData = {
        amount: parseInt(amount)*100,
        currency: "INR",
    };

    let res = await razorpay.orders.create(paymentData);


    return res.id;
};

async function receivePayment(req, res) {
    const { customer_id, products, amount } = req.body;
    const total_amount = parseInt(amount);
    const order_id = await initate(amount);
    const bill = new Bill({
        customer_id: customer_id,
        amount: total_amount,
        order_id: order_id
    });

    await bill.save();
    for (const item of products) {
        const billItem = new BillItem({
            bill_id: bill._id,
            product_id: item._id,
            quantity: parseInt(item.quantity),
            total_amount: parseInt(item.prod_amount )* parseInt(item.quantity)
        });
        await billItem.save();
    }

    res.json({ bill })
}

async function updatePayment(req, res) {
    let body = await req.formData();
    body = Object.fromEntries(body);
    //Checking in the server
    let entry = await Bill.findOne({order_id: body.razorpay_order_id });
    if (!entry) {
        return res.status(400).json({ success: false, message: "Order Id not found" })
    }

    //Verify the payment
    let xx = validatePaymentVerification(
        {
            "order_id": body.razorpay_order_id,
            "payment_id": body.razorpay_payment_id
        },
        body.razorpay_signature,
        process.env.RAZORPAY_SECRET
    );
    if (xx) {
        const newUser = await Bill.findOneAndUpdate({ order_id: body.razorpay_order_id }, { done: true }, { new: true });
        return res.status(200).json({ success: true, message: "Payment verified" });
    }
    else {
        return res.status(400).json({ success: false, message: "Payment verification failed" })
    }
}

module.exports = { receivePayment,updatePayment };