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

// Add to user history
exports.addToHistory = (req,res,next)=>{
    let history = []
    // loop on products
    history = req.body.products.map(product=>{
        return{
            _id         :   product._id,
            name        :   product.name,
            description :   product.description,
            quantity    :   product.quantity,
            amount      :   product.quantity * product.price,
            transact_id :   product.transactionId
        }
    })
    if(history.length){
        User.findOneAndUpdate(
            { _id : req.profile._id },
            { $push : 
                { history : history } 
            }, 
            { new : true },
            ( err , data ) => {
                if(err){
                    return res.status(400).json({ message : "Couldn't update history..."})
                }
                return next()
            }
        )
    }
    next()
}