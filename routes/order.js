// Import packages
const express = require('express');

// Use this packages
const router = express.Router();

// Import modules
const { requireSingIn , isAuth, isAdmin } = require("../middlewares/auth");
const { create, listOrders, getStatus } = require('../controllers/orderController');
const { userById, addToHistory } = require("../middlewares/user");
const { generateStock } = require('../middlewares/order');

router.get('/status/:userId',[requireSingIn, isAuth, isAdmin], listOrders);
router.get('/:userId',[requireSingIn, isAuth, isAdmin], getStatus);
router.post('/create/:userId',[requireSingIn, isAuth, addToHistory, generateStock],create);

// Return from the DB user with this id
router.param('userId',userById);

// Export the SR
module.exports = router;