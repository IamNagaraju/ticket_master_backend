const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const _ = require('lodash');
const jwt = require('jsonwebtoken');

const userSchema = new Schema ({
    userName: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function(value){
            return validator.isEmail(value)
        },
        message: 'invalid Email format'
    },
    password: {
        type: String,
        required:true,
        minlength: 8,
        maxlength: 128
    },
    mobile: {
        type: String,
        required: true,
        validate: function(value){
            return validator.isNumeric(value) && validator.isLength(value,{min:10,max:10});//is numeric takes numbers in strings
        },
        message: 'should be 10 digits'
    },
    tokens: [{
        
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        
    }]
});

//toJSON method is a inbuilt method, we are overriding the inbuit method
//it is a instance/obj method
//we are picking only required vlaues to send the data when we send data while instance promises(user.save() ...)

userSchema.methods.toJSON = function() {
    return _.pick(this,['userName','email','mobile','_id']);
};

//instance method
userSchema.methods.generateToken = function(){
    let tokenData = {
        _id : this._id
    };
    let generatedTokenInfo = {
        access : 'auth',
        token : jwt.sign(tokenData,'supersecret')//using jwt we are encoding the tokenData
    }
    this.tokens.push(generatedTokenInfo);
    return this.save().then((user) => {
        return generatedTokenInfo.token;
    });
};

//we are verifying the tokens by decoding
userSchema.statics.findByToken = function(token) {
    let tokenData;
    try{
        tokenData = jwt.verify(token,'supersecret');
    } catch(e) {
        // return new Promise((resolve,reject) => {
        //     reject(e);
        // })
        return Promise.reject(e);
    }

    return this.findOne({
        '_id': tokenData._id,
        'tokens.token': token
    })
}

const User = mongoose.model('User',userSchema);

module.exports = {
    User
}