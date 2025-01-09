require('dotenv').config();
const mongoose = require('mongoose');
const { watchBillUpdates } = require('./middlewares/billTriggers');

const connect_db = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        await watchBillUpdates();
        console.log('Connected to the database');

    }
    catch(error){
        console.log('Error connecting to the database', error);
    }
}

module.exports = connect_db;