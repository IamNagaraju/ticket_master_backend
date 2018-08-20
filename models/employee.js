const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String
    },
    department:{
        type:String,
        enum:['Technical','Hr','Sales'],
        required:true
    },
    salary:{
        type:Number
    },
    ageWhileJoining:{
        type:Number,
        min:18,
        max:65
    },
    address:{
        street:{
            type:String 
        },
        city:{
            type:String,
        },
        pincode:{
            type:Number
        }
    },
    hobbies:[String],//hobbies:['singing','drawing','reading']
    luckyNumbers: [Number],
    mobileNumbers:[
        {
            numType:{
                type:String
            },
            mobileNumber:{
                type:String
            }
        }
    ]
});

const Employee = mongoose.model('employee',employeeSchema);

module.exports = Employee;