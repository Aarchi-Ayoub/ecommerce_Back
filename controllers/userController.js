// Get one user method
exports.getUser = (req,res)=>{
    res.json({
        // Put the user send it by request in an user variable
        user : req.profile
    })
}