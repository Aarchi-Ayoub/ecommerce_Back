// Import packages
const formidable = require('formidable');
const fs = require('fs');
const Joi = require('joi');
const _ = require('lodash');
// Import modules
const Product = require('../models/product');

// Methode of create Product
exports.createProduct = (req,res)=>{
    // Check the upload
    let form = new formidable.IncomingForm();
    // Keep the extension
    form.keepExtensions = true;

    form.parse(req,(err,fields,files)=>{
        // Case of not upload
        if(err){
            res.status(400).json({
                message : "Image could'nt be upload..."
            });
        }
        // Instance new product
        let product = new Product(fields);
        // Check if image is'nt empty
        if(files.photo){
            // Check the size of image 
            if(files.photo.size > Math.pow(20,6)){
                res.status(400).json({
                    message : "Image size must be less than 2MB... "
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        // Schema for validete the information 
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.required(),
            quantity: Joi.required(),
            category: Joi.required()
        });
        // Valide the information of the product
        const { error } = schema.validate(fields);
        // Case of error 
        if(error){
            return res.status(400).json({
                message : error.details[0].message
            });
        }
        product.save((err,product)=>{
            // Error
            if(err) {
                return res.status(400).json({
                    err: 'Product not persist '
                })
            }
            res.json({
                product
            })
        });
    });
}
// Methode of show 1 product
exports.showProduct = (req,res)=>{
    // not show the images for the moment
    req.product.photo = undefined;
    res.json({
        product : req.product
    })
}
// Methode of delete product
exports.deleteProduct = (req,res)=>{
    // Get the product from request
    let product = req.product;
    // Delete the product
    product.remove((error,product)=>{
        if(error){
            res.status(404).json({message: "Product not found..."});
        }
        res.status(204).json({});
    });
}
// Methode of update product
exports.updateProduct = (req,res)=>{
    // Check the upload
    let form = new formidable.IncomingForm();
    // Keep the extension
    form.keepExtensions = true;

    form.parse(req,(err,fields,files)=>{
        // Case of not upload
        if(err){
            res.status(400).json({
                message : "Image could'nt be upload..."
            });
        }
        // Use our product
        let product = req.product;
        // Update the attributs
        product = _.extend(product,fields); // Affecter les valeurs du FIELDS to PRODUCT
        // Check if image is'nt empty
        if(files.photo){
            // Check the size of image 
            if(files.photo.size > Math.pow(20,6)){
                res.status(400).json({
                    message : "Image size must be less than 2MB... "
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        // Schema for validete the information 
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.required(),
            quantity: Joi.required(),
            category: Joi.required()
        });
        // Valide the information of the product
        const { error } = schema.validate(fields);
        // Case of error 
        if(error){
            return res.status(400).json({
                message : error.details[0].message
            });
        }
        product.save((err,product)=>{
            // Error
            if(err) {
                return res.status(400).json({
                    err: 'Product not updated '
                })
            }
            res.json({
                product
            })
        });
    });
    
}
// Methode of list products
exports.listProduct = (req,res)=>{
    let SortBy = req.query.sortby ? req.query.sortby : '_id';
    let OrderBy = req.query.orderby ? req.query.orderby : 'asc';
    let Limit = req.query.limit ? parseInt(req.query.limit) : 100; 
    Product.find()
            .select('-photo') // all except phote
            .populate('category') // information about the category
            .sort([[SortBy,OrderBy]])
            .limit(Limit)
            .exec((error,data)=>{
                if(error){
                    res.status(404).send({
                        message : 'Product not found....'
                    })
                }
                res.status(200).json({
                    products : data
                })
    });
}
// Realated product 
exports.relatedProduct = (req,res)=>{
    let Limit = req.query.limit ? parseInt(req.query.limit) : 6; 
    Product.find({category: req.product.category, _id:{ $ne: req.product._id }})
            .limit(Limit)
            .select('-photo')
            .populate('category','_id name')
            .exec((error,data)=>{
                if(error){
                    res.status(404).send({
                        message : 'Product not found....'
                    })
                }
                res.status(200).json({
                    products : data
                })
            });
}
// Search multi critere
exports.searchProduct = (req,res)=>{
    let SortBy = req.query.sortby ? req.query.sortby : '_id';
    let OrderBy = req.query.orderby ? req.query.orderby : 'asc';
    let Limit = req.query.limit ? parseInt(req.query.limit) : 100; 
    let Skip = parseInt(req.query.skip);
    let finArgs = {};
    
    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0){
            if(key === "price"){
                finArgs[key] = {
                    $gt : req.body.filters[key][0],
                    $lt : req.body.filters[key][1]
                }
            }else{
                finArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(finArgs)
            .select('-photo') // all except phote
            .populate('category') // information about the category
            .sort([[SortBy,OrderBy]])
            .limit(Limit)
            .skip(Skip)
            .exec((error,data)=>{
                if(error){
                    res.status(404).send({
                        message : 'Product not found....'
                    })
                }
                res.status(200).json({
                    products : data
                })
    });
}