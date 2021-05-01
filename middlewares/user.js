// Import the models
const User = require('../models/user');
// Find By Id methode
exports.userById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        // Case of not found
        if(err || !user){
            return res.status(404).json({
                error : "User not found..."
            });
        }
        // Put the user in vrb and send it by request
        req.profile = user;
        next();
    });
}