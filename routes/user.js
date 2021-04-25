// Import package
const express = require("express");
// Config package
const router = express.Router();
// Import modules
const { getUser } = require("../controllers/userController");
const { userById } = require("../middlewares/user");
const { requireSingIn , isAuth , isAdmin} = require("../middlewares/auth");
// Return user
router.get('/profile/:id', requireSingIn, isAuth /*,isAdmin*/, getUser);

// Use the middlewars with id
router.param('id',userById);

// Export the router system
module.exports = router;