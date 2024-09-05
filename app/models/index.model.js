const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./users.model");
db.Product = require("./Product.model")
module.exports=db