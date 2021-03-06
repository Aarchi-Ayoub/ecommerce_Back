// Import the models
const Product = require('../models/product');
// Find By Id methode
exports.productByID = (req,res,next,id)=>{
    Product.findById(id).populate('category').exec((error,product)=>{
        // Case of not found
        if(error || !product){
            return res.status(404).json({
                message : "Product not found..."
            });
        }
        req.product = product;
        next();
    });
}