import ExpensesPage from "../components/expensesPage/ExpensesPageComponent.jsx";
import ExpensesForm from "../components/expensesPage/ExpensesFormComponent.jsx"
import { expensesAjax } from "../ajax/expensesAjax.js"

var getExpensesPage = function () {
    $("#content").remove();
    $("#content-container").append("<div id = 'content'></div>")

    Promise.all([expensesAjax.getGroupInfoAjax(), expensesAjax.getExpenseDataAjax(), expensesAjax.getExpenseTotalsDataAjax()]).then((res) => {

        let [userNames, expenseData, expensesTotals] = res;
        // console.log("Promise.all for expenses are_____________", userNames, expenseData, expensesTotals);
        let processedData = expensesAjax.processData(expenseData, userNames);
        ReactDOM.render(
            <ExpensesPage view="eachExpense" expenses={processedData} totals={expensesTotals} userNamesInGroup={userNames} >  </ExpensesPage>, document.getElementById('content')
        );

        let processedUserNames = processUserNames(userNames);
        ReactDOM.render(
            <ExpensesForm usersInGroup={processedUserNames} />, document.getElementById('CreateFormContent')
        );

    }).catch((error) => console.log(error));
}

/**
 * @typedef proccessedUserNames
 * @type {object}
 * @property {object} userId 
 * @property {string} userId.firstName
 * @property {string} userId.lastName
 * @example - {'1':{firstName:"Tolis",lastName:"Gerodimos"}}
 * 
 */


/**
 * 
 * @param {import("../ajax/expensesAjax.js").userNames} userNames
 * @returns {proccessedUserNames} 
 */

let processUserNames = function (userNames) {
    let proccessedUserNames = {};

    userNames.forEach(userNameTuple => {
        let [firstName, lastName, userId] = userNameTuple;

        proccessedUserNames[userId] = {};
        proccessedUserNames[userId].firstName = firstName;
        proccessedUserNames[userId].lastName = lastName;
    });

    return proccessedUserNames;
}


export { getExpensesPage };



