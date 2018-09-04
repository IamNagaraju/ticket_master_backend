const express = require('express');
const Employee = require('../models/employee');
const Ticket = require('../models/ticket')
const router = express.Router();
const _=require('lodash');

router.get('/:id/tickets',(req,res) => {
    let id = req.params.id
    Ticket.find({employee:id}).then(ticket => {
        if(ticket.length ==0) {
            res.send({notice:'No tickets found'})
        }
      res.send(ticket)
    }).catch(err => res.send(err))

  })
  

router.get('/list',(req,res) =>{
    let param = req.query.sort;
    let orderBy = param.order =='ASC' ? 1:-1;
    Employee.find().sort({param:orderBy}).then(employee => res.send(employee));
})

router.get('/:id/mobile_numbers',(req,res) =>{
    let id = req.params.id;
    Employee.findById(id).select(['id','name','mobileNumbers']).then( employee => {
        (employee) ? res.send(employee) :res.send({notice:'Employee not found'})
    })
    .catch(err => res.send(err))
})

router.get('/',(req,res) =>{
   Employee.find().then(employee =>{
       res.send(employee);
       console.log(employee.length)
   })
   .catch(err => res.send(err))
})

router.get('/shortInfo',(req,res) => {
   Employee.findById(req.params.id).then(employee => {
       res.send(employee.shortInfo());
   })
})

//if we are getiing the array of objects, but if we want perform on one object we will iterate and do it
// router.get('/show/short_info',(req,res) =>{
//     Employee.find().then(employees => {
//         let result = employees.map(emp => emp.shortInfo());
//         res.send(result);
//     }).catch(err => res.send(err))
// })



router.get('/:id',(req,res) =>{
   Employee.findById(req.params.id).populate('tickets').then(employee => (employee) ? res.send(employee) : res.send({notice:'id not found'}))
})

router.post('/',(req,res) =>{
    let body = _.pick(req.body,['name','email','department','salary','ageWhileJoining','hobbies','luckyNumbers','address','mobileNumbers'])
    let emp1 = new Employee(body);
    emp1.save().then(employee =>{
        res.send(employee);
    })
    .catch(err => res.send(err))
})

//adding mobile numbers to employee
router.post('/:id/mobile_numbers',(req,res) => {
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

// router.put('/mobile_numbers/:id',(req,res) =>{
//     Employee.update({ 'mobileNumbers._id':req.params.id} , {$set: { 'mobileNumbers.$.numType': req.body.numType }}, { new: true })
//     .then((error, employee) =>{
//         console.log(employee);
//         res.send({employee});
//     })
//     .catch(err => res.status(400).send(err))
// })

router.put('/:id',(req,res) => {
    Employee.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true,runValidators:true}).then(employee =>{
        res.send(employee);
    }).catch(err => res.send(err))
})

router.put('/:id/mobile_numbers/:mobile_id',(req,res) =>{
    let id  = req.params.id;
    let mobileId  = req.params.mobile_id;
    let body = _.pick(req.body,['numType','mobileNumber']);
    Employee.findById(id).then(employee =>{
        if(employee) {
        let contact = employee.mobileNumbers.id(mobileId);
        contact.numType = body.numType ? body.numType : contact.numType;
        contact.mobileNumber = body.mobileNumber ? body.numType : contact.mobileNumber;
        return employee.save();
        }
        res.send({notice:'employee not found'})
    })
    .then(employee => res.send({contact,notice:'updated'}))
    .catch(err => res.send(err))
})

router.delete('/:id/mobile_numbers/:mobile_id',(req,res) =>{
    let id = req.params.id;
    let mobileId = req.params.mobile_id;
    Employee.findById(id).then(employee => {
        if(employee) {
        employee.mobileNumbers.remove(mobileId);
        return employee.save();
        }
        res.send({notice:'employee not found'})
    })
    .then(employee => res.send({notice:'suceccesfully deleted'}))
    .catch(err => res.send(err))
})

router.delete('/:id',(req,res) =>{
    Employee.findByIdAndRemove(req.params.id).then( employee =>{
        (employee) ? res.send({employee,notice:'successfully deleted'}) : res.send({notice:' id not found'}) 
    })
    .catch(err => res.send(err))
})

module.exports = {
    employeeRouter:router
}