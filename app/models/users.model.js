const mongoose = require('mongoose');

// Define the Address schema
const addressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    streetAddress: { type: String, required: true },
    Landmark:{ type: String, reqire:true},
    city: { type: String, required: true },
    pincode: { type: Number},
    state: { type: String, required: true },
});

// Define the User schema with addresses array
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        FirstName: { type: String, required: true },
        LastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        addresses: [addressSchema], // Array of address objects
    })
);

module.exports = User;
