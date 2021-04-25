// Import packages
const expressJWT = require('express-jwt');
// Use the vrb-env
require('dotenv').config();
// Methode for check the singIn
exports.requireSingIn = expressJWT({
    secret       : process.env.JWT_SECRET,
    algorithms   : ['HS256'],
    userProperty : 'auth'
});
// Methode for check the authentification
exports.isAuth = (req,res,next)=>{
    /* In case of authentificate and admin dont verifie 
    if(req.auth.role ==1 ){
        return next();
    }*/
    /* 
        Check if we have auth and profile variables 
        Check if the id in those variables is the same
    */ 
    let user  = req.profile && req.auth && (req.profile._id == req.auth._id);
    if(!user){
        return res.status(403).json({
            error : "Acces denied..."
        })
    }
    next();
}
// Check the role of the authentification user
exports.isAdmin = (req,res,next)=>{ 
    // Case not admin
    if(req.auth.role == 0 ){
        res.status(403).json({
            error : 'You are not admin ! Access denied...'
        });
    }
    else{next();}
}