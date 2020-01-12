var expensesController = require('express').Router();
var authValidation = require('../services/passportService').authValidation;

expensesController.get('/home/expenses', authValidation, function (req, res, next) {
    console.log(req.user);
    res.render('expenses.ejs');
});



module.exports = expensesController;