const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ticketSchema = new Schema({
    code:{
       type:String
    },
    name:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'open'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    employee:{
        type:Schema.Types.ObjectId,
        ref:'Employee'
    }
})
//no using of arrow fucntions when we are using this keyword
ticketSchema.statics.openTickets = function () {
    return this.find({status:'open'});
}

ticketSchema.statics.completdTickets = function() {
    return this.find({status:'completed'});
}

ticketSchema.statics.findByPriority = function(value) {
    return this.find({priority:value})
}

ticketSchema.pre('save',function(next) {
 if(!this.code) {
     this.code = 'DCT-' + this._id.toString().slice(12);
 }
 next();
})

const Ticket = mongoose.model('Ticket',ticketSchema);

module.exports = Ticket;