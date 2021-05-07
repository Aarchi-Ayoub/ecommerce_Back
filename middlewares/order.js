const { updateOne } = require("../models/user")
const Product = require('../models/product')
exports.generateStock = (req, res, next)=>{

    let bluksOp = req.body.products.map(product =>{
        return{
            updateOne:{
                filter  : {_id: product._id},
                update  : { $inc: {solde: +product.count , quantity: -product.count}  }
            }
        }
    })
    // Execute the table
    Product.bulkWrite(bluksOp, (err,products) => {
        if(err){
            return res.status(500).json({error : "Error "})
        }
        next();
    })
}