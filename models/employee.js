const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name:{
        type:String,
        validate:{
            validator:function (value) {
                return   /^[a-zA-Z ]*$/.test(value);
            },
            message: function (props) {
                return `${props.path} must contain only alphabets`
            }
        }

    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:function (value) {
                return  /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
            },
            message: function (props) {
                return `${props.path} is not a valid id`
            }
        }
    },
    department:{
        type:String,
        enum:['Technical','Hr','Sales'],
        required:true
    },
    salary:{
        type:Number,
        validate:{
            validator:function(value) {
                return value>10000;
            },
            message:function(props) {
                return `${props.path} should be greater than 10000`
            }
        }
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
    ],
    tickets:[{
        type:Schema.Types.ObjectId,
        ref:'Employee'
    }]
});
//to create our own instance methods 
//to create class methods we use statics keyword
employeeSchema.methods.shortInfo = function() {

    return {
        _id:this._id,
        name:this.name,
        email:this.email,
        count:this.mobileNumbers.length
    }
}



const Employee = mongoose.model('Employee',employeeSchema);

module.exports = Employee;