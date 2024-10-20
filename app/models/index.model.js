const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./users.model");
db.Product = require("./Product.model")
db.Cart = require("./Cart.model")
module.exports=db