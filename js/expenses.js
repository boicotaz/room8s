import ExpensesPage from "../components/expensesPage/ExpensesPageComponent.jsx";
import ExpensesForm from "../components/expensesPage/ExpensesFormComponent.jsx"
import { expensesAjax } from "../ajax/expensesAjax.js"
import {grouDetailsAjax} from "../ajax/groupDetailsAjax"

var getExpensesPage = function () {
    $("#content").remove();
    $("#content-container").append("<div id = 'content'></div>")

    Promise.all([grouDetailsAjax.getUsersInGroupDetails(), expensesAjax.getExpenseDataAjax(), expensesAjax.getExpenseTotalsDataAjax()]).then((res) => {

        let [usersInGroupDetails, expenseData, expensesTotals] = res;
        // console.log("Promise.all for expenses are_____________", userNames, expenseData, expensesTotals);
        let processedData = expensesAjax.processData(expenseData, usersInGroupDetails);
        ReactDOM.render(
            <ExpensesPage view="eachExpense" expenses={processedData} totals={expensesTotals} usersInGroupDetails={usersInGroupDetails} >  </ExpensesPage>, document.getElementById('content')
        );

        // let processedUserNames = processUserNames(userNames);
        ReactDOM.render(
            <ExpensesForm usersInGroup={usersInGroupDetails} />, document.getElementById('CreateFormContent')
        );

    }).catch((error) => console.log(error));
}



export { getExpensesPage };



