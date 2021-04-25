// Import packages
const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuid } = require('uuid');

// Create our schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true,
        unique: true
    },
    hashed_password:{
        type: String,
        required: true,
    },
    salt: {
        type: String
    },
    about:{
        type: String,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
},{
    timestamps:true
});

// Create the virtual fieled Password
userSchema.virtual('password').set(function(password){
                                // Local variable
                                this._password = password;
                                // Generate a uuid
                                this.salt = uuid();
                                this.hashed_password  = this.cryptedPassword(password)
                            }).get(function(){
                                 return this._password;
                            })

// Create a virtual method
userSchema.methods = {
    // Test the equal of the password in base an the coming in form 
    authenticate: function(plainText) {
        return this.cryptedPassword(plainText) === this.hashed_password;
    },
    // Crypte the password
    cryptedPassword : function(password){
        if(!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (error) {
            return ''
        }
    }
};
// Create our Model
module.exports = mongoose.model('User',userSchema); 