var userNames;
var counter = 1;
var expenseData;

// <Create Expenses Table>

function processData(data, userNames) {
    console.log('data in function', data);
    console.log('userNames in Data', userNames);
    let processedData = data.map(expense => {
        let processedTransaction = expense.map(transaction => {
            let names = userNames.map(entry => {
                let idInfo = {};
                if (transaction.creditor == entry[1]) {
                    idInfo.creditorName = entry[0];
                    // console.log('found smth')
                }
                if (transaction.debtor == entry[1]) {
                    idInfo.debtorName = entry[0];
                }
                return idInfo;
            }).filter(elem => { if (!(Object.entries(elem).length === 0)) return elem })
            // console.log(names);
            let processedTransaction = { ...transaction, ...names[0], ...names[1] }
            return processedTransaction;
        })
        // console.log(processedTransaction);
        return processedTransaction;
    })
    console.log('final data is ', processedData);
    ReactDOM.render(<ExpensesTable expensesData={processedData}> </ExpensesTable>, document.getElementById('expenses-table'))
}

var ajaxRequest = function (userNames, skip) {
    return $.ajax({
        url: '/home/expenses/get-expense-table',
        method: 'GET',
        dataType: "json",
        success: function (data) {
            console.log('data RETURNED: ', data);
            expenseData = data;
            // console.log('is Event Listener Created?' do)
            if (skip) {
                processData(expenseData, userNames);
            }
            else {
                document.addEventListener('userNamesReady', (e) => {
                    console.log('caught event usernames ready', e.detail, 'and Returned Data is:', data);
                    processData(data, e.detail);
                }

                    , false);
            }

            // processData(data)
        },
        error: function (error) {
            console.log(error);
        }

    })
}


ajaxRequest();

class ExpensesTable extends React.Component {
    render() {
        // return (<React.Fragment> {dropDownList} </React.Fragment>)
        let data = this.props.expensesData.map(expense => {

            let tranactionsData = expense.map(transaction => {
                return transaction.debtorName + ' - ' + transaction.debt + '$'
            })
            console.log(tranactionsData);

            return <tr>
                <td>{expense[0].creditorName}</td>
                <td>{tranactionsData.reduce((accumulator, currentValue) => accumulator + ' , ' + currentValue)}</td>
                <td>{expense[0].when}</td>
                <td>{expense[0].description}</td>
                <td>{expense[0].credit} $</td>
            </tr>
        })
        console.log(data);
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


class Expenses extends React.Component {
    render() {
        return (<a className="dropdown-item" map={this.props.mapping} onClick={(e) => this.handleSelectDebtorEvent(e)} href="#">{this.props.userFirstName}</a>);
    }

}

class User_drop_down_item extends React.Component {
    render() {
        return (<a className="dropdown-item" map={this.props.mapping} onClick={(e) => this.handleSelectDebtorEvent(e)} href="#">{this.props.userFirstName}</a>);
    }

    handleSelectDebtorEvent() {
        if (this.props.inputFieldId != null) {
            console.log('in handle select debtor', this.props.hiddenId);
            document.getElementById(this.props.inputFieldId).value = this.props.userFirstName;
        }

        if (this.props.hiddenId != null) document.getElementById(this.props.hiddenId).value = userNames[this.props.mapping][1];

    }
}

class User_drop_down_list extends React.Component {
    render() {
        let usernames = this.props.users.map(elem => elem[0]);
        console.log('in create drop down list', this.props.hiddenId);
        const dropDownList = usernames.map((username, index) => <User_drop_down_item userFirstName={username} inputFieldId={this.props.inputFieldId} hiddenId={this.props.hiddenId} mapping={index} />)

        return (<React.Fragment> {dropDownList} </React.Fragment>)
    }
}

class Debtor extends React.Component {
    render() {

        console.log(this.props.userNames);
        return (<React.Fragment> <div className="md-form mb-4">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <div className="input-group-prepend">
                        <button className="btn btn-dark dropdown-toggle btn-block" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Debtor</button>
                        <div id={this.props.dropDownId} className="dropdown-menu">
                            <User_drop_down_list users={this.props.userNames} inputFieldId={this.props.inputFieldId} hiddenId={this.props.hiddenId} />
                        </div>
                    </div>
                </div>
                <input readOnly={true} id={this.props.inputFieldId} name="debtor" type="text" className="form-control" placeholder="Bitch" />
                <input name={this.props.debtName} type="number" className="form-control" placeholder="Debt" />
                <input id={this.props.hiddenId} name={this.props.hiddenName} type="hidden" />
                <div id={this.props.removeButtonId}>
                    <a href="#">  <i className="fa fa-times ml-2 mt-2 " aria-hidden="true" style={{ color: 'black' }} ></i> </a>
                </div>
            </div>
        </div> </React.Fragment>)
    }

}


function renderDropDownList(userNames, id) {
    ReactDOM.render(
        <User_drop_down_list users={userNames} />, document.getElementById(id)
    )
}
$(document).ready(function () {





    // <Submit Create Expense Form> 
    $("#expense-form").submit(function (event) {
        event.preventDefault();
        // console.log($( this ).serializeArray());
        let data = $(this).serializeArray();

        // Contstruct debtors
        let debtorsRaw = data.filter((elem, index) => {

            let debtRegex = RegExp('debt-');
            if (debtRegex.test(elem.name)) return elem

            let debtorRegex = RegExp('debtorId-');
            if (debtorRegex.test(elem.name)) return elem
        });

        let debtors = debtorsRaw.map((elem, index) => {
            let debtRegex = RegExp('debt-');
            if (debtRegex.test(elem.name)) {
                return { id: parseFloat(debtorsRaw[index + 1].value), debt: parseFloat(parseFloat(elem.value).toFixed(2)) }
            }
        }).filter(elem => { if (elem) return elem });

        //Construct creditors
        let creditorRaw = data.filter(elem => {
            if (elem.name == "creditorId" || elem.name == "credit") return elem;
        })
        let creditor = { id: creditorRaw[0].value, credit: creditorRaw[1].value }

        //Construct info
        let infoRaw = data.filter(elem => {
            if (elem.name == "date" || elem.name == "desc") return elem;
        })
        let info = { date: infoRaw[0].value, desc: infoRaw[1].value }


        let postData = { "creditor": creditor, "debtors": debtors, "info": info }
        console.log(postData);

        $.ajax({
            url: '/home/expenses/create-expense',
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify(postData),
            contentType: "application/json",
            // contentType: "application/json",
            success: function (result) {
                console.log('create expense result: ', result);

                var newEvent = new CustomEvent('userNamesReady', { detail: userNames });
                document.dispatchEvent(newEvent);

                ajaxRequest(userNames, true);
                $("#alert-success").show( function () {
                    // $('#darkModalForm').delay(10000).modal('toggle');
                })
                

            },
            error: function (error) {
                console.log(error);
            }

        });
    })
    // </Submit Create Expense Form>

    $(document).on('click', "#creditor-drop-down a", function () {
        $("#creditor-field").val($(this).text());
        $("#creditor-id").val(userNames[$(this).attr("map")][1]);
        // console.log($(this).attr("map"));
    })

    $(document).on('click', "#method-payment-dropdown a", function () {
        $("#method-payment-field").val($(this).text());
    })


    $(document).on('click', "#debtor-drop-down-1 a", function () {
        $("#debtor-field-1").val($(this).text());
        $("#hidden1").val(userNames[$(this).attr("map")][1]);
    })


    $("#debtor-remove-1").click(function () {
        $("#debtor-1").remove();
        if ($("#method-payment-field").val() == "Evenly") {
            $("#split-evenly").trigger("click");
        }
        $("#alert-warning").hide(500);

    })

    $("#split-evenly").click(function () {
        console.log('evenly trigged');
        $("div input:nth-of-type(2):not([type=hidden])").each(function () {
            $(this).attr("readonly", true);
            let divCreditBy = $("div input:nth-of-type(2):not([type=hidden])").length;
            let credit = parseFloat($("#credit").val());

            let debt = credit / divCreditBy;
            $(this).val(debt.toFixed(2));
        })
    })
    $("#split-manual").click(function () {

        $("div input:nth-of-type(2)").each(function () {
            $(this).attr("readonly", false);
        })
    })

    $("#credit").on('keyup', function (e) {
        if ($("#method-payment-field").val() == "Evenly") {
            $("#split-evenly").trigger("click");
        }
    });

    // debtor-drop-down
    $(document).on('click', "#add-debtor-link", function () {

        if ($("#debtors-group").children().length == userNames.length) {
            $("#alert-warning").show(function () {
            });
            return;
        }

        counter++;

        let newDeptorId = "debtor-" + String(counter);
        let dropDownId = "debtor-drop-down-" + String(counter);

        let inputFieldId = "debtor-field-" + String(counter);
        let removeButtonId = 'debtor-remove-' + String(counter);
        let hiddenId = "hidden" + String(counter);
        let debtName = "debt-" + String(counter);
        let hiddenName = "debtorId-" + String(counter);
        // console.log(hiddenId);
        $("#debtors-group").append('<div id ="' + newDeptorId + '"> </div>')

        ReactDOM.render(
            <Debtor userNames={userNames} dropDownId={dropDownId} inputFieldId={inputFieldId} removeButtonId={removeButtonId} hiddenId={hiddenId} debtName={debtName} hiddenName={hiddenName} />, document.getElementById(newDeptorId)
        )
        $("#" + removeButtonId).click(function () {
            $("#" + newDeptorId).remove();
            if ($("#method-payment-field").val() == "Evenly") {
                $("#split-evenly").trigger("click");
            }
            $("#alert-warning").hide(500);
        })

        if ($("#method-payment-field").val() == "Evenly") {
            $("#split-evenly").trigger("click");
        }
        console.log($("#debtors-group").children().length);
    })


    var getUserRequest = $.ajax({
        url: '/api/get-current-user',
        type: "GET",
        success: function (user) {
            // console.log(user);
            var getUserFirstNamesInGroup = $.ajax({
                url: '/api/get-users-in-group',
                type: "POST",
                data: user,
                dataType: "json",
                success: function (returnedData) {
                    userNames = returnedData;
                    console.log(userNames);

                    var event = new CustomEvent('userNamesReady', { detail: userNames });
                    document.dispatchEvent(event);

                    let elementToAppendDataTo = "creditor-drop-down";
                    renderDropDownList(returnedData, elementToAppendDataTo);

                    elementToAppendDataTo = "debtor-drop-down-1";
                    renderDropDownList(returnedData, elementToAppendDataTo);
                }
            });
        }
    })
})