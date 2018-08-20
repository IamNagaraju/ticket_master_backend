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

app.get('/employee/list',(req,res) =>{
    let param = req.query.sort;
    let orderBy = param.order =='ASC' ? 1:-1;
    Employee.find().sort({param:orderBy}).then(employee => res.send(employee));
})

app.get('/employee/:id/mobile_numbers',(req,res) =>{
    let id = req.params.id;
    Employee.findById(id).select(['id','name','mobileNumbers']).then( employee => {
        (employee) ? res.send(employee) :res.send({notice:'Employee not found'})
    })
    .catch(err => res.send(err))
})

app.get('/employee',(req,res) =>{
   Employee.find().then(employee =>{
       res.send(employee);
       console.log(employee.length)
   })
   .catch(err => res.send(err))
})


app.get('/employee/:id',(req,res) =>{
   Employee.findById(req.params.id).then(employee => (employee) ? res.send(employee) : res.send({notice:'id not found'}))
})

app.post('/employee',(req,res) =>{
    let body = _.pick(req.body,['name','email','department','salary','ageWhileJoining','hobbies','luckyNumbers','address','mobileNumbers'])
    let emp1 = new Employee(body);
    emp1.save().then(employee =>{
        res.send(employee);
    })
    .catch(err => res.send(err))
})

//adding mobile numbers to employee
app.post('/employee/:id/mobile_numbers',(req,res) => {
    let id = req.params.id;
    Employee.findById(id).then(employee => {
        if(employee) {
            employee.mobileNumbers.push(req.body)
            return employee.save();
        }
        res.send({notice:'Employee not found'})
    }) .then(employee => {
        let newMobile = employee.mobileNumbers[employee.mobileNumbers.length-1];
        res.send({
            newMobile,
            notice:'added data'
        })
    })
    .catch(err => res.send(err))
})

app.put('/employee/:id',(req,res) =>{
let body = _.pick(req.body,['email','hobbies','salary']);
Employee.findByIdAndUpdate(req.params.id,{$set:body},{new:true}).then(employee =>{
(employee) ? res.send(employee) : res.send({notice:'your id is not found'})
})
.catch(err => res.send(err))
})

app.delete('/employee/:id',(req,res) =>{
    Employee.findByIdAndRemove(req.params.id).then( employee =>{
        (employee) ? res.send({employee,notice:'successfully deleted'}) : res.send({notice:' id not found'}) 
    })
    .catch(err => res.send(err))
})

app.listen(port,()=> console.log('listing to port number '+port))