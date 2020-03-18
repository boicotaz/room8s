// Ajax request to retrieve the data needed to create the expense table
let getExpenseDataAjax = function (userNames, skip) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/home/expenses/get-expense-table',
            method: 'GET',
            dataType: "json",
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }

        })
    });

}

/**
 * @typedef userNameTuple
 * @type {array}
 * @property {string} 0 - firstName
 * @property {string} 1 - lastName
 * @property {number} 2 - userId
 */

/**
 * @typedef userNames
 * @type {array<userNameTuple>}
 */

/**
 * @return {Promise<userNames>}
 */
let getGroupInfoAjax = function () {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/api/get-current-user',
            type: "GET",
            success: function (user) {
                $.ajax({
                    url: '/api/get-users-in-group',
                    type: "POST",
                    data: user,
                    dataType: "json",
                    success: function (userNames) {
                        resolve(userNames);
                    },
                    error: function (err) {
                        console.log(err);
                        reject(err);
                    }
                });
            }
        })
    });
}


// Ajax request to retrieve the TOTALS data needed to create the expense TOTALS table
let getExpenseTotalsDataAjax = function () {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/home/expenses/get-expense-totals-table',
            method: 'GET',
            dataType: "json",
            success: function (data) {
                resolve(data);
                console.log('this should the totals table state: ', data);
            },
            error: function (error) {
                reject(error);
            }

        })
    });

}


//Pass the data to backend so it will store them in our db
let storeNewExpense = function (postData, newExpense, clientSocket) {
    $.ajax({
        url: '/home/expenses/create-expense',
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(postData),
        contentType: "application/json",
        // contentType: "application/json",
        success: function (result) {
            $("#alert-success").show(function () {
                new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        $('#alert-success').hide(800);
                        resolve({ msg: 'ok' });
                    }, 5000);
                })
            })
            document.getElementById('expense-form').reset();
            clientSocket.emit('new-expense', newExpense);
        },
        error: function (error) {
            console.log(error);
        }

    });
}

// Creates the expense table by using the ExpensesTable Component
let processData = function (data, userNames) {
    // console.log("in processData__________________", data, userNames)
    let userNamesMap = new Map();

    userNames.forEach(user => {
        userNamesMap.set(parseInt(user[2],10), `${user[0]} ${user[1]}`);
    });

    if (Array.isArray(data)) {
        data.forEach(expense => {
            if (Array.isArray(expense)) {
                expense.forEach(transaction => {
                    transaction.creditorFullName = userNamesMap.get(parseInt(transaction.creditor,10));
                    transaction.debtorFullName = userNamesMap.get(parseInt(transaction.debtor,10));
                })
            }
            else {
                expense.creditorFullName = userNamesMap.get(parseInt(expense.creditor,10));
                expense.debtorFullName = userNamesMap.get(parseInt(expense.debtor,10));
            }
        });
    }
    else {
        data.creditorFullName = userNamesMap.get(parseInt(data.creditor,10));
        data.debtorFullName = userNamesMap.get(parseInt(data.debtor,10));
    }


    return data;

}

let expensesAjax = {};

expensesAjax.storeNewExpense = storeNewExpense;
expensesAjax.getExpenseTotalsDataAjax = getExpenseTotalsDataAjax;
expensesAjax.getGroupInfoAjax = getGroupInfoAjax;
expensesAjax.getExpenseDataAjax = getExpenseDataAjax;
expensesAjax.processData = processData;


export { expensesAjax }