// 'use strict';
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = require('express').Router();
var User = require('./../model/User.js')
// config = require('./../config');






// Hooks the JWT Strategy.
// function hookJWTStrategy(passport) {
//     var options = {};
//     options.secretOrKey = '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE=';
//     options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
//     options.ignoreExpiration = false;

//     passport.use(new JWTStrategy(options, function (JWTPayload, callback) {
//         console.log(JWTPayload);
//         User.findOne({ where: { email: JWTPayload.email } })
//             .then(function (user) {
//                 console.log(user);
//                 if (!user) {
//                     callback(null, false);
//                     return;
//                 }

//                 callback(null, user);
//             });
//     }));
// }






module.exports = router;