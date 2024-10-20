const controller = require("../controllers/Product.controllers");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/products/Addproduct", controller.Addproduct);
    app.put("/api/productsU/:id", controller.UpdateProduct);
    app.delete("/api/products/:id", controller.DeleteProduct);
    app.get('/product/:id',controller.FindProductById);
    app.get("/api/products/Find", controller.FindProduct); 
    app.get("/api/findProductByField", controller.findProductByField);
    app.get("/api/Product/best-selling",controller.getBestSellingItems)
};
