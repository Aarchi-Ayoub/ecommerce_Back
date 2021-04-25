// Import modules
const Category = require('../models/category');

// Methode of create Cat
exports.createCategory = (req,res)=>{
    const category = new Category(req.body);

    category.save((err, category) => {
         
        if(err) {
            return res.status(400).json({
                error: 'bad Request !'
            })
        }

        res.json({
            cartegory: category
        })
    })

}

// Show category
exports.showCategory = (req,res)=>{
    res.json({
        category :  req.category
    })
}

// Delete category
exports.deleteCategory = (req,res)=>{
    let category = req.category;
    category.remove((error,category)=>{
        if(error){
            return res.status(404).json({
                message : "Category not found..."
            });
        }
        res.status(204).json({})
    });
}

// Update category
exports.updateCategory = (req,res)=>{
    let category = req.category;
    category.name = req.body.name;
    category.save((error,category)=>{
        if(error){
            return res.status(400).json({
                message : 'Category can\'t be updated'
            })
        }
        res.status(204).send({
            category,
            message : 'Category is updated'
        })
    });
}

// List categories
exports.listeCategories = (req,res)=>{
    Category.find().exec((error,data)=>{
        if(error || !data){
            res.status(404).json({
                message : error
            })
        }
        res.send({
            data
        })
    });
}