const { Order } = require("../models/order")
// Make an order
exports.create = (req,res)=>{
    // Recive form front
    req.body = {
        ...req.body,
        user : req.profile
    }
    // Create new 
    const order = new Order(req.body);
    // Save in base
    order.save((err,data)=>{
        if(err){
            return res.status(400).json({message: err});
        }
        res.json({data: data});
    });
}
// List all aorders
exports.listOrders = (req,res)=>{
    
    Order.find()
        .populate('user','_id, email, name')
        .sort('-createdAt')
        .exec((err,orders)=>{
            if(err){
                return res.status(500).json({message : err.message})
            }
            res.send(orders)
        })
}
// Status 
exports.getStatus = (req,res)=>{
    res.json({
        status: Order.schema.path('status').enumValues
    })
}