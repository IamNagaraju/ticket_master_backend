const express = require('express');
const _=require('lodash')

const { User } = require('../models/user');

const app = express();

const router = express.Router();

const port = 3000;

router.get('/',(req,res) =>{
 User.find().then(user => {
   res.send(user)
 }).catch(err => res.send(err))
})

router.post('/',(req,res) =>{
  let body =_.pick(req.body,['username','email','password','mobile']);
  let user = new User(body)
  user.save().then(user =>{
    return user.generateToken()
  }).then(token => {
    res.header('x-auth',token).send(user)
  }).catch(err => {
    res.send(err)
  })
})

module.exports = {
  usersRouter:router
}

