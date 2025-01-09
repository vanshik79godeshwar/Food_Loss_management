const Product = require('../models/Product'); 
const BillItem = require('../models/BillItem');
const Bill = require("../models/Bill"); 

async function watchBillUpdates() {
  try {
    console.log("Connected to MongoDB, watching Bill updates...");

    const changeStream = Bill.watch([
      { $match: { operationType: "update" } }
    ]);

    changeStream.on("change", async (change) => {
      const billId = change.documentKey._id; 

      console.log(`Bill updated: ${billId}`);

      const billItems = await BillItem.find({ bill_id: billId });

      for (const item of billItems) {
        const product = await Product.findOne({ _id: item.product_id });

        if (product.quantity >= item.quantity) {
          await Product.findOneAndUpdate(
            { _id: item.product_id },
            { $inc: { quantity: -item.quantity } }
          );
          console.log(`Updated quantity for product: ${item.product_id}`);
        } else {
          console.log(`Insufficient stock for product: ${item.product_id}. Quantity update skipped.`);
        }
      }

      console.log(`Product quantities checked for Bill: ${billId}`);
    });
  } catch (error) {
    console.error("Error watching Bill updates:", error);
  }
}

module.exports = { watchBillUpdates };
