// import 
class ExpensesPage extends React.Component {
    render() {
        let expensePage = <div id='expenses-content' className="container" style={{ marginTop: '250px' }} >
            <div className="row" id="buttons-row">
                <div className='col-12'>
                    <div className="btn-group btn-group-md" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary" data-toggle="modal"
                            data-target="#darkModalForm">Create Expense</button>
                        <button type="button" onClick={getTotalsPage} className="btn btn-secondary">View Totals</button>
                    </div>
                </div>
            </div>
            {/* style={{ color: 'black' }} */}
            <div id="expense-table-id" className="row">
                <div className='col-12 pr-0'>
                    <table id='expenses-table' className="table table-hover table-dark ">
                    </table>
                </div>
            </div>
        </div>

        return (<React.Fragment>  {expensePage} </React.Fragment>)
    }
}

//React componenent that dynamically creates the expense table
class ExpensesTable extends React.Component {
    state = {
        expenses: []
    }
    constructor(props) {
        super(props);
        this.state.expenses = props.expenses;
        document.addEventListener('new-expense', e => {
            this.setState({ expenses: [...this.state.expenses, e.detail] })
        })

    }

    render() {
        console.log('expenses STATE is', this.state.expenses)

        let data = this.state.expenses.map(expense => {

            let tranactionsData = expense.map(transaction => {
                return transaction.debtorName + ' - ' + transaction.debt + '$'
            })
            // console.log(tranactionsData);
            return <tr>
                <td >{expense[0].creditorName}</td>
                <td>{tranactionsData.reduce((accumulator, currentValue) => accumulator + ' , ' + currentValue)}</td>
                <td>{expense[0].when}</td>
                <td>{expense[0].description}</td>
                <td>{expense[0].credit} $</td>
            </tr>
        })
        // console.log(data);
        return (<React.Fragment>
            <thead>
                <tr>
                    {/* <th scope="col">#</th> */}
                    <th scope="col">Creditor</th>
                    <th scope="col">Debtors</th>
                    <th scope="col">When</th>
                    <th scope="col">Description</th>
                    <th scope="col">Credit</th>
                </tr>
                {[...data]}
            </thead>
            <tbody>

            </tbody>
        </React.Fragment>)

    }
}






