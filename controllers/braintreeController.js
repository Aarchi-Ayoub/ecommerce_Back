const braintree = require("braintree");
//Config App
require('dotenv').config();
// Configure the environment
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
});
// Generate a client token
exports.generateToken = (req,res)=>{
    gateway.clientToken.generate({}, (err, response) => {
        // Case of error 
        if(err){
            return res.status(500).json({ message: err })
        }
        // Pass clientToken to your front-end
        res.json({ token: response.clientToken});
    });
}
// Payement method
exports.paymentProcess = (req,res)=>{
    // Recive from front
    let { amount , paymentMethodNonce } = req.body;
    gateway.transaction.sale({
        amount,
        paymentMethodNonce,
        options:{
            submitForSettlement:true
        }
    },(err,result)=>{
        if(err){
            return res.status(500).json({
                message : err
            })
        }
        res.send(result)
    })
}