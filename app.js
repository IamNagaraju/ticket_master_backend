const express = require('express');

const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const morgan = require('morgan')
const _=require('lodash');
const mongoose = require('./config/db');
const Ticket = require('./models/ticket');

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

app.get('/', (req, res) => {
  res.send({ msg: 'welcome to ticket master' })
})

app.get('/tickets', (req, res) => {
  Ticket.find()
    .then((tickets) => {
      res.send(tickets)
    })
    .catch((err) => {
      res.send(err);
    })
})

app.post('/tickets', (req, res) => {
  let body =_.pick(req.body,['name','department','message','priority'])
  let ticket = new Ticket(body)
  ticket.save().then((ticket) => {
    res.send(ticket);
  })
    .catch((err) => {
      res.send(err);
    })
})

app.get('/tickets/:id', (req, res) => {
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

app.put('/tickets/:id', (req, res) => {
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

app.delete('/tickets/:id', (req, res) => {
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

app.listen(port, () => {
  console.log('listing to port num ' + port);
})