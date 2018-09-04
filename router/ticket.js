const express = require('express');
const Ticket = require('../models/ticket');
const router = express.Router();
const _=require('lodash');
// router.get('/', (req, res) => {
//     res.send({ msg: 'welcome to ticket master' })
//   })


  router.get('/', (req, res) => {
    Ticket.find()
      .then((tickets) => {
        res.send(tickets)
      })
      .catch((err) => {
        res.send(err);
      })
  })
  
  router.get('/:id',(req,res) => {
    let id =req.params.id;
    Ticket.findById(id).populate('employee').then(ticket =>{
      if(ticket) {
        res.send(ticket);
      } else {
        res.send({notice:'Ticket not found'})
      }
    })
  })
router.get('/status/open',(req,res)=> {
  Ticket.openTickets().then(tickets =>{
    if(tickets) {
      res.send(tickets);
    }
    res.send({notice:'tickets not fflound'})
  });
});

router.get('/status/completed',(req,res)=> {
  Ticket.completdTickets().then(tickets =>{
    if(tickets) {
      res.send(tickets);
    }
    res.send({notice:'tickets not fflound'})
  });
});

router.get('/priority/:value',(req,res) =>{
  Ticket.findByPriority(req.params.value).then(tickets =>{
    res.send(tickets);
  });
});



  router.post('/', (req, res) => {
    let body =_.pick(req.body,['name','department','message','priority','employee'])
    let ticket = new Ticket(body)
    ticket.save().then((ticket) => {
      res.send(ticket);
    })
      .catch((err) => {
        res.send(err);
      })
  })
  
  router.get('/:id', (req, res) => {
    let id = req.params.id;
    // if (!ObjectId.isValid(req.params.id)) {
    //   res.send({ notice: 'not a valid object id' })
    // }
    Ticket.findById(id).then((ticket) => {
      if (ticket) {
        res.send({
          ticket,
          notice: 'this are the tickets stored'
        });
      } else {
        res.send({ notice: 'ticket not found' })
      }
    })
      .catch((err) => {
        res.send(err);
      })
  })
  
  router.put('/:id', (req, res) => {
    let id = req.params.id;//req.body is an object
    let body = _.pick(req.body,['name','department','message','priority','status'])
  
    Ticket.findByIdAndUpdate(id, { $set: body }, { new: true }).then((ticket) => {
      if (ticket) {
        res.send({
          ticket,
          notice: 'successfully updated the ticket'
        });
      } else {
        res.send({ notice: 'ticket not found' })
      }
    })
      .catch((err) => {
        res.send(err)
      })
  })
  
  router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Ticket.findByIdAndRemove(id).then((ticket) => {
      if (ticket) {
        res.send({
          ticket,
          notice: 'successfully deletd the ticket'
        });
      } else {
        res.send({ notice: 'ticket not found' })
      }
    })
      .catch((errr) => {
        res.send(err)
      })
  })
 
  module.exports = {
      ticketRouter :router
  }