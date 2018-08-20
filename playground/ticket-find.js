const mongoose = require('../config/db');
const Ticket = require('../models/ticket');

//find all tickets

// Ticket.find().then(tickets => console.log(tickets));

//find all the tickets based on priority

// Ticket.find({priority:'High'}).then(tickets => console.log(tickets));

//find all the tickets based on the department

// Ticket.find({department:'Technical'}).then(tickets => console.log(tickets));

//find all the tickets based on the deaprtment and priority

// Ticket.find({priority:'High',department:'Technical'}).then(tickets => console.log(tickets));
//to find count of documents in acollection

Ticket.countDocuments().then(value => console.log(value));

// to find one record 

// Ticket.findOne({department:'Technical',priority:'High'}).then(ticket => console.log(ticket));

//used to find and return documents with only selected properties

// Ticket.find().select(['name','department']).then(tickets => console.log(tickets));

////limits number of objs tobe sent back

// Ticket.find({department:'Technical'}).limit(2).then(tickets => console.log(tickets))

//useful for pagination
// Ticket.find().skip(1).limit(2).then(tickets => console.log(tickets))

//sort name based on desc order
// Ticket.find().sort({name:-1}).then(tickets =>console.log(tickets));

//sort createdAt based on asc order
// Ticket.find().sort({createdAt:1}).then(tickets =>console.log(tickets));

