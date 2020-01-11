var signOutController = require('express').Router();
var userService = require('../services/userService')();
var authValidation = require('../services/passportService').authValidation;
// console.log(typeof userService);
signOutController.get('/', authValidation, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = signOutController;