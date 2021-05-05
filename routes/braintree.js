// Import packages
const express = require('express');

// Use this packages
const router = express.Router();

// Import modules
const { generateToken , paymentProcess } = require('../controllers/braintreeController');
const { requireSingIn , isAuth } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

router.get('/token/:userId',[requireSingIn, isAuth],generateToken);
router.post('/purchase/:userId',[requireSingIn, isAuth],paymentProcess);

// Return from the DB user with this id
router.param('userId',userById);

// Export the SR
module.exports = router;