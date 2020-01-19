var expensesController = require('express').Router();
var authValidation = require('../services/passportService').authValidation;
var groupService = require('../services/groupService')();
const transactionService = require('../services/transactionService')();
const expenseService = require('../services/expenseService')();

expensesController.get('/', authValidation, function (req, res, next) {
    res.render('expenses.ejs', { user: req.user });
});

expensesController.post('/create-expense', authValidation, function (req, res, next) {

    let { creditor, debtors, info } = req.body;
    groupService.findGroupByUserId(creditor.id).then(group => expenseService.createExpense({ groupId: group.getGroupId(), description: info.desc, createdAt: info.date, sum: creditor.credit }, function (expense, isCreated) {
        if (isCreated) {
            // console.log(expense);
            transactionService.createTransactions(expense.getExpenseId(), creditor.id, debtors).then(res => console.log('----------------------------------------------------transactions created are :', res));
            res.json({ data: req.body, expenseId: expense.getExpenseId() });
        }
        else {
            res.json({ "message": "failed to create expense object" });
        }
    }));
});
// creditor: transaction.getCreditor(), debtor: transaction.getDebtor(), when: expense.getDate(), 
// description: expense.getDescription(), credit: expense.getSum(), debt: transaction.getDebt()
// expensesData;
expensesController.get('/get-expense-table', authValidation, async function (req, res, next) {
    groupService.findGroupByUserId(req.user.id).then((group) => {
        //    console.log("------------------------Group Id is: ", group.getGroupId());
        expenseService.findAllExpensesByGroupId(group.getGroupId()).then((expenses) => {
            //    console.log("----------------------Expense Id is: ", expenses[0].getExpenseId());
            var expensesData = expenses.map((expense) => {
                return transactionService.findAllTransactionsByExpenseId(expense.getExpenseId()).then((transactions) => {
                    // console.log("---------------Transaction id is:", transactions[0].getTransactionId())
                    var trans_data = transactions.map(transaction => { return { creditor: transaction.getCreditor(), debtor: transaction.getDebtor(), when: expense.getDate(), description: expense.getDescription(), credit: expense.getSum(), debt: transaction.getDebt() } });
                    // console.log('Finally transaction data returned!!! ', trans_data); 
                    return trans_data;
                });
            })

            Promise.all(expensesData).then(function (results) {
                res.json(results);
            })
        })
    })

})


module.exports = expensesController;