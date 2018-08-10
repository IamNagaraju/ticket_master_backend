const express = require('express');

const bodyParser = require('body-parser') 

const morgan =require('morgan')

const mongoose = require('./config/db');

console.log(mongoose);
const app = express();

const port = 3000;
// MiddleWare
app.use(bodyParser.json());

app.use(morgan('short'));

app.get('/',(req,res)=>{
    res.send({msg:'welcome to ticket master'})
})

app.listen(port,()=>{
    console.log('listing to port num '+port);
})