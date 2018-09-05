const express = require('express');

const {User} = require('../models/user');
const { authenticateUser } = require('../middlewares/authentication')
const router = express.Router();
const _ = require('lodash');

router.get('/',(req,res) => {
    res.send('hi')
});

//authenticate middleware
//custom middleware,we can call where ever we require



router.get('/profile',authenticateUser,(req,res) => {
    //req.locals
    res.send(req.locals.user);
});

router.post('/',(req,res) => {
    let body =  _.pick(req.body,['userName','email','mobile','password']);
    let user = new User(body);
    user.save().then((user) => {
        return user.generateToken()
    }).then((token) => {
        res.header('x-auth',token).send(user);//we are passing token data in header
    }).catch((err) => res.send(err));
});

module.exports = {
    usersRouter:router
}