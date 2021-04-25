// Import packages
const express = require('express');
// Use this packages
const router = express.Router();

// Import modules
const { 
        createProduct , 
        showProduct , 
        deleteProduct , 
        updateProduct ,
        listProduct ,
        relatedProduct
    } = require('../controllers/productController');

const { requireSingIn , isAuth , isAdmin} = require("../middlewares/auth");
const { userById } = require("../middlewares/user");
const { productByID } = require("../middlewares/product");

// Route of products
router.get('/',listProduct);

// Route of show product
router.get('/:productId',showProduct);

// Route of related products
router.get('/related/:productId',relatedProduct);

// Route of perciste
router.post('/create/:userId',[requireSingIn, isAuth, isAdmin],createProduct);

// Route of delete product
router.delete('/:productId/:userId',[requireSingIn, isAuth, isAdmin],deleteProduct);

// Route of update product
router.put('/:productId/:userId',[requireSingIn, isAuth, isAdmin],updateProduct);

// Return from the DB user with this id
router.param('userId',userById);
// Return from the DB user with this id
router.param('productId',productByID);

// Export the SR
module.exports = router;
