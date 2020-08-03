const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/users')
const config = require('../config/dev')
const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// SESSION AUTH
// passport.serializeUser(function(user, done) {
//   done(null, user.id)
// })

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user)
//   })
// })

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  // first, find user in db
  User.findOne({ email }, function(err, user) {
    if(err) { return done(err) }
    if(!user) { return done(null, false) }
    // compare password
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err) }
      if (!isMatch) { return done(null, false) }
      
      return done(null, user)
    })
  })
}))

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.jwt_secret
}

passport.use(new jwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.id, (err, user) => {
    if (err) return done(err, false)
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
}))