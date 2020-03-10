var userNames;
var counter = 1;
var expenseData;

var getExpensesPage = function () {
    console.log("FIRST CHILD IS=======", $("#content").first(), $("#content").children(":first"));

    $("#content").remove();
    $("#content-container").append("<div id = 'content'></div>")

    // ReactDOM.render(
    //     <ExpensesPage view="eachExpense">  </ExpensesPage>, document.getElementById('content')
    // );

    Promise.all([getGroupInfoAjax(), getExpenseDataAjax(), getExpenseTotalsDataAjax()]).then((res) => {
        var userIdsAndNamesInGroup = res[0];
        var expenseData = res[1];
        var expensesTotals = res[2];
        let processedData = processData(expenseData, userIdsAndNamesInGroup)
        console.log("data for TOTALS is ", expensesTotals);
        console.log(res);
        ReactDOM.render(
            <ExpensesPage view="eachExpense" expenses={processedData} totals={expensesTotals}>  </ExpensesPage>, document.getElementById('content')
        );
        // ReactDOM.render(<ExpensesTable expenses={processedData} />, document.getElementById('expenses-table'))
    }).catch((error) => console.log(error));
}

// Ajax request to retrieve the TOTALS data needed to create the expense TOTALS table
var getExpenseTotalsDataAjax = function () {
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

// Creates the expense table by using the ExpensesTable Component
function processData(data, userNames) {
    // console.log('data in function', data);
    // console.log('userNames in Data', userNames);
    let processedData = data.map(expense => {
        let processedTransaction = expense.map(transaction => {
            // console.log(userNames);
            let names = userNames.map(entry => {
                let idInfo = {};
                if (transaction.creditor == entry[1]) {
                    idInfo.creditorName = entry[0];
                    console.log('found smth')
                }
                if (transaction.debtor == entry[1]) {
                    idInfo.debtorName = entry[0];
                }
                return idInfo;
            }).filter(elem => { if (!(Object.entries(elem).length === 0)) return elem })

            let processedTransaction = { ...transaction, ...names[0], ...names[1] }

            return processedTransaction;
        })
        // console.log(processedTransaction);

        return processedTransaction;
    })

    return processedData;

}


var getGroupInfoAjax = function () {
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
                    success: function (returnedData) {
                        userNames = returnedData;
                        // console.log(userNames);
                        resolve(returnedData);
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


// Ajax request to retrieve the data needed to create the expense table
var getExpenseDataAjax = function (userNames, skip) {
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


//Pass the data to backend so it will store them in our db
function storeNewExpense(postData, newExpense) {
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
            socket.emit('new-expense', newExpense);
        },
        error: function (error) {
            console.log(error);
        }

    });
}





