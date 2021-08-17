const mongoose = require('mongoose');
const {v4: uuidv4}=require('uuid')


const BankSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String,
    balance: Number,
    account:Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('Bank', BankSchema);