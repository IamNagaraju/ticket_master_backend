const { User } = require('../models/user');

let authenticateUser = (req,res,next) => {
  let token = req.header('x-auth');
  User.findByToken(token).then(user => {
      //between functions if we want to pass data we use req object
      //by using re.locals we can use locals in views (like .pug) also
      req.locals = {
          user,
          token
      }
      next();
  }).catch(err => res.status(401).send(err))
};

module.exports ={ authenticateUser }                                                                                             