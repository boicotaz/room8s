

import {expensesAjax} from "../../ajax/expensesAjax.js";

// React Component to create the debtors row in the create expense form 
// depends on User_drop_down_list and User_drop_down_item
class Debtor extends React.Component {

    removeDeptor = (e) => {
        this.props.removeDeptor(this.props.id);
    }

    onChange = (e) => {
        console.log('event fired', e);
        // this.props.debt = 4444;
    }

    selectDebtor = (dropDownId) => {
        this.props.selectDebtor(dropDownId, this.props.id);
    }

    render() {
        let isDebtorSelected;
        let debtorName;
        if (this.props.debtorSelected === undefined) {
            isDebtorSelected = false;
        }
        else {
            let debtor = this.props.usersInGroup.filter(elem => {
                if (elem[1] == this.props.debtorSelected) {
                    return elem;
                }
            })
            debtorName = debtor[0][0];
            isDebtorSelected = true;
        }

        return (<React.Fragment>
            <div className="md-form mb-4">
                <div className="input-group form-group">
                    <div className="input-group-prepend">
                        <div className="input-group-prepend">
                            <button className="btn btn-dark dropdown-toggle btn-block" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Debtor</button>
                            <div className="dropdown-menu">
                                <User_drop_down_list users={this.props.usersInGroup} selectDebtor={this.selectDebtor} selectMethod={"Debtor"} />
                            </div>
                        </div>
                    </div>
                    <input readOnly={true} name="debtor" type="text" className="form-control" placeholder="Bitch" value={this.props.isDebtorSelected === undefined ? debtorName : "Bitch"} />
                    <input type="number" className="form-control" name="debt" onChange={this.onChange} readOnly={this.props.evenly} value={this.props.evenly == true ? this.props.debt.toFixed(2) : console.log('hey')} placeholder="Debt" />
                    <input type="hidden" name="debtorId" value={this.props.debtorSelected === undefined ? null : this.props.debtorSelected} />
                    <div >
                        <a href="#">  <i className="fa fa-times ml-2 mt-2" onClick={this.removeDeptor} aria-hidden="true" style={{ color: 'black' }} ></i> </a>
                    </div>
                </div>
            </div> </React.Fragment>)
    }

}

export default class ExpensesForm extends React.Component {
    counter = 0;
    state = {
    }

    submitForm = (e) => {
        e.preventDefault();

        let formData = $('#expense-form').serializeArray();
        console.log(formData);
        let creditor = {};
        let debtors = [];
        let info = {};
        let creditorName;
        let debtorNames = [];
        formData.forEach((elem, index, array) => {
            if (elem.name == "creditorId")  creditor.id = elem.value;
            if (elem.name == "credit") creditor.credit = elem.value;
            if (elem.name == "debt") {
                debtors.push({ id: array[index + 1].value, debt: elem.value })
                debtorNames.push(array[index - 1].value)
            }
            if(elem.name == "creditor") creditorName = elem.value;

            if (elem.name == "date") info.date = elem.value;
            if (elem.name == "desc") info.desc = elem.value;
        })

        let postFormData = { creditor, debtors, info }
        let newExpense = [];
        debtors.forEach((elem,index) => {
            newExpense.push({creditor: creditor.id, debtor: elem.id, when: info.date, description: info.desc, credit: creditor.credit,debt: elem.debt, creditorName, debtorName: debtorNames[index]  })
        });
        
        console.log("THE NEW EXPENSE IS:", newExpense);
        expensesAjax.storeNewExpense(postFormData, newExpense);
    }


    selectCreditor = (dropDownId) => {
        let creditor = this.props.usersInGroup.filter(elem => {
            if (elem[1] == dropDownId) {
                return elem;
            }
        })
        let creditorName = creditor[0][0];
        let creditorId = creditor[0][1];

        this.setState({ creditor: { creditorName: creditorName, creditorId: creditorId } })
    }

    selectDebtor = (dropDownId, debtorId) => {

        let debtors = this.state.debtors.map((elem, index) => {
            if (elem.id == debtorId) {
                return { ...elem, debtorSelected: dropDownId }
            }
            else {
                return elem;
            }

        })
        this.setState({ debtors });
    }

    updateCreditField = () => {
        if (this.state.evenly) this.updateDebtorFields();
    }

    updateDebtorFields = () => {
        if (!this.state.evenly) {
            this.setState({ debtors: this.state.debtors, evenly: this.state.evenly, credit: this.state.credit });
            return;
        }
        let credit = document.getElementById('credit').value;
        this.setState({ debtors: this.state.debtors, evenly: this.state.evenly, credit: parseFloat(credit) });

    }
    addDropdown = (e) => {
        counter++;
        this.setState({ debtors: [...this.state.debtors, { usersInGroup: this.props.usersInGroup, id: counter }], evenly: this.state.evenly, credit: this.state.credit });
    }

    changeSplitMethod = (e) => {
        if (e.target.innerText == "Evenly") {
            this.state.evenly = true
        }
        else this.state.evenly = false;

        this.updateDebtorFields();
    }

    removeDeptor = (id) => {
        this.setState({
            credit: this.state.credit, evenly: this.state.evenly, debtors: this.state.debtors.filter(debtor => {
                if (debtor.id != id) return debtor;
            })
        })
    }

    constructor(props) {
        super(props);
        this.state.debtors = [{ usersInGroup: props.usersInGroup, id: 0 }]
        this.state.evenly = true;
        this.state.credit = 0;
    }
    render() {
        return (
            // <!-- Modal -->
            <div className="modal fade" id="darkModalForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div className="modal-dialog form-dark" role="document">
                    {/* <!--Content--> */}
                    <div className="modal-content card card-image" style={{ backgroundColor: 'burlywood' }}>
                        <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
                            {/* <!--Header--> */}
                            <div className="modal-header text-center pb-4">
                                <h3 className="modal-title w-100 white-text font-weight-bold" id="myModalLabel">
                                    <strong>Create Expense</strong></h3>
                                <button type="button" className="close white-text" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {/* <!--Body--> */}
                            <div className="modal-body">
                                {/* <!--Body--> */}
                                <form id="expense-form" method="POST" onSubmit={this.submitForm}  >
                                    <div className="md-form mb-4">
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <button className="btn btn-dark dropdown-toggle btn-block" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">Creditor</button>
                                                <div className="dropdown-menu">
                                                    <User_drop_down_list users={this.props.usersInGroup} selectCreditor={this.selectCreditor} selectMethod={"Creditor"} />
                                                </div>
                                            </div>
                                            <input readOnly={true} name="creditor" id="creditor-field" type="text"
                                                className="form-control" aria-label="Text input with dropdown button"
                                                value={this.state.creditor !== undefined ? this.state.creditor.creditorName : console.log('no creditor selected')} placeholder="Creditor" />
                                            <input type="hidden" id="creditor-id" name="creditorId" value={this.state.creditor === undefined ? "Creditor" : this.state.creditor.creditorId} />
                                        </div>
                                    </div>

                                    <div className="md-form mb-4">
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <button className="btn btn-dark btn-block" type="button">Credit</button>
                                            </div>
                                            <input id="credit" autoComplete="off" name="credit" onChange={this.updateCreditField} type="number" step="0.01"
                                                className="form-control" placeholder="$$$" />
                                        </div>
                                    </div>

                                    <div className="md-form mb-4">

                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <button className="btn btn-dark dropdown-toggle btn-block" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">Method</button>
                                                <div id='method-payment-dropdown' className="dropdown-menu">
                                                    <a id="split-evenly" onClick={this.changeSplitMethod} className="dropdown-item">Evenly</a>
                                                    <a id="split-manual" onClick={this.changeSplitMethod} className="dropdown-item">Manual</a>
                                                </div>
                                            </div>
                                            <input readOnly={true} value={this.state.evenly == true ? "Evenly" : "Manual"} id="method-payment-field" type="text"
                                                className="form-control" aria-label="Text input with dropdown button" />
                                            <div id="link-div">
                                                <a id="add-debtor-link" href="#"> <i className="fa fa-user-plus ml-2 mt-2 " onClick={this.addDropdown}

                                                    style={{ color: 'black' }}></i> </a>
                                            </div>
                                        </div>

                                    </div>

                                    <div id="debtors-group">
                                        {this.state.debtors.map((elem, index) => { return <Debtor selectDebtor={this.selectDebtor} evenly={this.state.evenly} usersInGroup={elem.usersInGroup} debtorSelected={elem.debtorSelected} id={elem.id} key={elem.id} debt={(this.state.credit / this.state.debtors.length)} removeDeptor={this.removeDeptor}> </Debtor> })}
                                    </div>

                                    <div className="mb-4">
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <button className="btn btn-dark btn-block" type="button">Date</button>
                                            </div>
                                            <input name="date" type="date" className="form-control" onFocus="(this.type='date')"
                                                placeholder="When" />
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <button className="btn btn-dark btn-block" type="button">Info</button>
                                            </div>
                                            <input name="desc" type="text" className="form-control" autoComplete="off"
                                                placeholder="Description" />
                                        </div>
                                    </div>

                                    {/* <!--Grid row--> */}
                                    <div className="row d-flex align-items-center mb-4">

                                        {/* <!--Grid column--> */}
                                        <div className="text-center mb-3 col-md-12">
                                            <button type="submit"
                                                className="btn btn-success btn-block btn-rounded z-depth-1">Confirm</button>
                                        </div>
                                        {/* <!--Grid column--> */}

                                    </div>
                                    {/* <!--Grid row--> */}
                                </form>
                            </div>
                        </div>
                        <div id="alert-warning" style={{ display: 'none' }} className="modal-footer">
                            <div className="alert alert-warning col-12" role="alert" style={{ paddingBottom: 0 }}>
                                <p className='text-center '>
                                    <strong>Warning!</strong> you dont need any more debtors, trust me! ;)
                            </p>
                            </div>
                        </div>

                        <div id="alert-success" style={{ display: 'none' }} className="modal-footer">
                            <div className="alert alert-success col-12" role="alert" style={{ paddingBottom: 0 }}>
                                <p className='text-center '>
                                    <strong>Success</strong> Expense created! Hooray!
                            </p>
                            </div>
                        </div>

                    </div>
                    {/* <!--/.Content--> */}
                </div>
            </div>)
        // {/* <!-- Modal -->) */}
    }

}


class User_drop_down_item extends React.Component {
    render() {
        let onClickFunc;
        if (this.props.selectDebtor) {
            onClickFunc = this.selectDebtor;
        }
        else if (this.props.selectCreditor) {
            onClickFunc = this.selectCreditor;
        }
        return (<a className="dropdown-item" map={this.props.mapping} onClick={onClickFunc} href="#">{this.props.userFirstName}</a>);
    }

    selectDebtor = () => {
        this.props.selectDebtor(this.props.itemId);
    }

    selectCreditor = () => {
        this.props.selectCreditor(this.props.itemId);
    }
}

class User_drop_down_list extends React.Component {
    selectDebtor = (dropDownId) => {
        this.props.selectDebtor(dropDownId);
    }

    selectCreditor = (dropDownId) => {
        this.props.selectCreditor(dropDownId);
    }

    render() {

        let onClickFunc;
        let select
        if (this.props.selectMethod == "Creditor") {
            onClickFunc = this.selectCreditor;
            select = "selectDebtor";
        }
        else if (this.props.selectMethod == "Debtor") {
            onClickFunc = this.selectDebtor;
            select = "selectCreditor"
        }

        let dropDownList = this.props.users.map((username, index) => {
            return <User_drop_down_item selectDebtor={select == "selectDebtor" ? onClickFunc : null} selectCreditor={select == "selectCreditor" ? onClickFunc : null} userFirstName={username[0]} key={username[1]} itemId={username[1]} inputFieldId={this.props.inputFieldId} hiddenId={this.props.hiddenId} mapping={index} />
        })

        return (<React.Fragment> {dropDownList} </React.Fragment>)
    }
}