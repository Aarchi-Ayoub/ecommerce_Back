// Import the packages
const jwt = require('jsonwebtoken'); 
const user = require('../models/user');
// Import the Model
const User = require('../models/user');

// Export the singup function
exports.singUp    = (req,res)=>{
    const user = User(req.body);
    // Perciste in the db with a callback
    user.save((err,user)=>{
        // Case of error
        if(err){
            res.status(400).send(err);
        }
        user.profile.hashed_password = undefined;
        user.profile.salt            = undefined;
        res.send(user);
    });
};

// Export the singin function
exports.singIn    = (req,res)=>{
    const { email, password } = req.body;
    // Check for email
    User.findOne({email},(error,user)=>{
        if( error || !user){
            res.status(400).json({
                error : "Invalid email..."
            });
        }
        // Equal of the password
        if(!user.authenticate(password)){
            return res.status(401).json({
                    error : "Password don't match..."
                });
        }
        // Generate a token
        const token = jwt.sign({ _id : user._id , role : user.role },process.env.JWT_SECRET);
        // Send the cookies
        res.cookie('token',token,{ expire : new Date() + 604800});
        // Send to the front side
        const { _id , name , email , role } = user;
        return res.json({
            token,
            user : { _id , name , email , role }
        });
    });
};

// Export the singout function
exports.singOut   = (req,res)=>{
    res.clearCookie('token');
    res.json({
        message : "User singout..."
    });
};