var expensesController = require('express').Router();
var authValidation = require('../services/passportService').authValidation;
var groupService = require('../services/groupService')();

expensesController.get('/home/expenses', authValidation, function (req, res, next) {
    res.render('expenses.ejs', {user:req.user});
});





module.exports = expensesController;