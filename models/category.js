// Import the packages
const mongoose = require('mongoose');

// Create our schema
const categorySchema = new mongoose.Schema({
    name : {
        type        : String,
        trim        : true,
        required    : true,
        maxlength   : 32
    }
    },{
        timestamps:true
    }
);

// Create & Export model
module.exports = mongoose.model('Category',categorySchema);