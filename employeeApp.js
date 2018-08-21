const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('./config/db')
const Employee = require('./models/employee')
const _= require('lodash');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(morgan('short'))
app.use('/employee',employeeRouter)

app.listen(port,()=> console.log('listing to port number '+port))