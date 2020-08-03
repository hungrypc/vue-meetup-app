const User = require('../models/users');
const passport = require('passport')

exports.getUsers = function(req, res) {
  User.find({})
        .exec((errors, users) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(users);
  });
}

exports.register = function(req, res) {
  const registerData = req.body

  if (!registerData.email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    })
  }

  if (!registerData.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    })
  }

  const user = new User(registerData)

  return user.save((err, savedUser) => {
    if (err) {
      return res.status(422).json({ errors: err })
    }
    return res.json(savedUser)
  })
}

exports.login = function(req, res, next) {
  const { email, password } = req.body

  if (!email) {
    return res.status(422).json({
      errors: {
        email: 'required'
      }
    })
  }
  if (!password) {
    return res.status(422).json({
      errors: {
        password: 'required'
      }
    })
  }

  return passport.authenticate('local', (err, passportUser) => {
    if (err) {
      return next(err)
    }

    if (passportUser) {
      return res.json(passportUser.toAuthJSON())
      // SESSION AUTH
      // we have this function because of passport middleware:
      // req.login(passportUser, function(err) {
      //   if (err) { next(err) }
      //   return res.json(passportUser)
      // })
    } else {
      return res.status(422).send({
        errors: {
          authentication: 'something went wrong'
        }
      })
    }
  })(req, res, next)
}

exports.getCurrentUser = function(req, res, next) {
  const user = req.user

  if(!user) {
    return res.sendStatus(422)
  }
  // return res.json(user)
  return res.json(user.toAuthJSON())
}

exports.logout = function(req, res) {
  req.logout()
  return res.json({ status: 'session destroyed' })
}