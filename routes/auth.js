// Import the packages
const express   = require('express');

// config the route
const route     = express.Router();

// Import the controllers
const { mainPage , singUp, singIn, singOut }  = require('../controllers/authController');

// Import the user validators
const { userSignUpValidator }  = require('../middlewares/userValidator');

// Import the auth checker
const {requireSingIn} = require('../middlewares/auth');

// Route for the singup
route.post('/singup',userSignUpValidator,singUp);

// Route for the singIn
route.post('/singin',singIn);

// Route for the singOut
route.get('/singout',singOut);

// Route for check the singIn
route.get('/auth',requireSingIn,(req,res)=> res.send('You are singin'));

// Export the route
module.exports = route;