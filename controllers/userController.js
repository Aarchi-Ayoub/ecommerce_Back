// Import modules
const User = require('../models/user');

// Get one user method
exports.getUser = (req,res)=>{
    // Hide the password & salte before sending data to the front side
    req.profile.hashed_password = undefined;
    req.profile.salt            = undefined;
    res.json({
        // Put the user send it by request in an user variable
        user : req.profile
    })
}

// Update user 
exports.updateUser = (req,res)=>{
    User.findOneAndUpdate(
        {_id : req.profile._id },
        { $set : req.body },
        { new : true },
        (err,data)=>{
            if(err){
                return res.status(404).json({err});
            }
            req.profile.hashed_password = undefined;
            req.profile.salt            = undefined;
            res.status(200).json(data)
        });
}