const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    streetAddress: { type: String, required: true },
    Landmark:{ type: String, reqire:true},
    city: { type: String, required: true },
    pincode: { type: Number},
    state: { type: String, required: true },
});

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        FirstName: { type: String, required: true },
        LastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        addresses: [addressSchema], 
    })
);
module.exports = User;
