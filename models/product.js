// Import & Use packages
const { boolean } = require('joi');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
// Create the Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxLength: 150,
        trim: true
    },
    description: {
        type: String,
        require: true,
        maxLength: 2000
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        require: true
    },
    shipping: {
        type: Boolean,
        default:false
    },
    solde: {
        type: Number,
        default:0
    }
    },{
        timestamps : true
    }
);
// Create & Export the Model
module.exports = mongoose.model('Product',productSchema);