const controller = require("../controllers/shipping.controllers");
const {authJwt} = require("../middlewares/index")

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/Shipping/addaddress",[authJwt.verifyToken],controller.Addaddress);
    app.get("/api/Shipping/getaddress",[authJwt.verifyToken],controller.Getaddress);
}