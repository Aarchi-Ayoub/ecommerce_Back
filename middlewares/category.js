const Category = require('../models/category');
exports.categoryByID = (req,res,next,id)=>{
    Category.findById(id).exec((error,category)=>{
        if(error || !category){
            return res.status(404).json({
                message : "Category not found..."
            })
        }
        req.category = category;
        next();
    });
}