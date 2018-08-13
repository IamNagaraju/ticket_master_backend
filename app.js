const express = require('express');

const bodyParser = require('body-parser')
const {ObjectId} = require('mongodb')
const morgan = require('morgan')

const mongoose = require('./config/db');
const Ticket = require('./models/ticket');

const app = express();

const port = 3000;
// MiddleWare
app.use(bodyParser.json());

app.use('/tickets/:id',(req,res,next) =>{
 if(!ObjectId.isValid(req.params.id)){
   res.send({notice:'not a valid object id'})
 }
 next();
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
  let body = req.body;
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
  Ticket.findById(id).then((ticket) => {
    if (ticket) {
      res.send({
        ticket,
        notice: 'successfully posted the ticket'
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
  //$set is 
  Ticket.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((ticket) => {
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