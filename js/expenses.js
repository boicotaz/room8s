import ExpensesPage from "../components/expensesPage/ExpensesPageComponent.jsx";
import ExpensesForm from "../components/expensesPage/ExpensesFormComponent.jsx"
import {expensesAjax} from "../ajax/expensesAjax.js"

var getExpensesPage = function () {
    $("#content").remove();
    $("#content-container").append("<div id = 'content'></div>")

    Promise.all([expensesAjax.getGroupInfoAjax(), expensesAjax.getExpenseDataAjax(), expensesAjax.getExpenseTotalsDataAjax()]).then((res) => {
 
        let [userNames, expenseData, expensesTotals] = res;
        console.log("Promise.all for expenses are_____________",userNames, expenseData, expensesTotals);
        let processedData = processData(expenseData, userNames);
        ReactDOM.render(
            <ExpensesPage view="eachExpense" expenses={processedData} totals={expensesTotals}>  </ExpensesPage>, document.getElementById('content')
        );
        ReactDOM.render(
            <ExpensesForm usersInGroup={userNames} />, document.getElementById('CreateFormContent')
        );

    }).catch((error) => console.log(error));
}


// Creates the expense table by using the ExpensesTable Component
let processData = function (data,userNames){
    console.log("in processData__________________",data,userNames)
    let userNamesMap = new Map();

    userNames.forEach(user => {
        userNamesMap.set(user[2],`${user[0]} ${user[1]}`);
    });

    data.forEach(expense => {
        if(Array.isArray(expense)){
            expense.forEach(transaction => {
                transaction.creditorFullName = userNamesMap.get(transaction.creditor);
            })
        }
        else {
            expense.creditorFullName = userNamesMap.get(expense.creditor);
        }
    });

    return data;

}

export {getExpensesPage};



