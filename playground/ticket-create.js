const mongoose = require('../config/db');
const Ticket = require('../models/ticket');

// create is a class method can create multiple methods at a time
Ticket.create({
    name:'Nagaraju',
    department:'Technical',
    priority:'High',
    message:'net slow'
}).then(ticket =>{
    console.log(ticket);
})
.catch(err =>{
    console.log(err)
})
