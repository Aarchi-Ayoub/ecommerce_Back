// Import packages
const express = require('express');
// Use this packages
const router = express.Router();
// Import modules
const { 
        createCategory ,
        showCategory ,
        listeCategories ,
        deleteCategory ,
        updateCategory
    } = require('../controllers/categoryController');
const { requireSingIn , isAuth , isAdmin} = require("../middlewares/auth");
const { userById } = require("../middlewares/user");
const { categoryByID } = require("../middlewares/category");

// Route of perciste
router.post('/create/:userId',[requireSingIn, isAuth, isAdmin],createCategory);

// Route of show category
router.get('/:categorytId',showCategory);

// Route of show categories
router.get('/',listeCategories);

// Route of delte category
router.delete('/:categorytId/:userId',[requireSingIn, isAuth, isAdmin],deleteCategory);

// Route of update category
router.put('/:categorytId/:userId',[requireSingIn, isAuth, isAdmin],updateCategory);

// Return from the DB user with this id
router.param('userId',userById);
router.param('categorytId',categoryByID);

// Export the SR
module.exports = router;
