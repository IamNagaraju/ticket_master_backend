const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const _=require('lodash');

const {ticketRouter} = require('./router/ticket');
const { ObjectId } = require('mongodb')
const { User } = require('../ticket-master-back-end/models/user')
const { usersRouter } = require('./router/user')
const mongoose = require('./config/db');
const Ticket = require('./models/ticket');
const {employeeRouter} = require('./router/employee');
const app = express();

const port = 3000;
// MiddleWare
app.use(bodyParser.json());

app.param('id',(req,res,next) =>{
    if(!ObjectId.isValid(req.params.id)){
      res.send({notice:'not a valid id'})
    }
  else{
    next();
  }
})

app.use(morgan('short'));

app.use('/tickets',ticketRouter);
app.use('/employee',employeeRouter);
app.use('/users',usersRouter);

app.listen(port, () => {
  console.log('listing to port num ' + port);
})