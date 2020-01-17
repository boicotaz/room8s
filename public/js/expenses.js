var userNames;
var counter = 1;
class User_drop_down_item extends React.Component {
    render() {
        return (<a className="dropdown-item"  onClick={(e) => this.handleSelectDebtorEvent(e)} nani='wut' href="#">{this.props.userFirstName}</a>);
    }

    handleSelectDebtorEvent() {
        if(this.props.inputFieldId != null)
        document.getElementById(this.props.inputFieldId).value = this.props.userFirstName;
    }
}

class User_drop_down_list extends React.Component {
    render() {
        let usernames = this.props.users.map(elem => elem[0]);

        const dropDownList = usernames.map(username => <User_drop_down_item userFirstName={username} inputFieldId={this.props.inputFieldId} />)
        return (<React.Fragment> {dropDownList} </React.Fragment>)
    }
}

class Debtor extends React.Component {
    render(){

        console.log(this.props.userNames);
        return (<React.Fragment> <div className="md-form mb-4"> 
                                <div className="input-group form-group"> 
                                 <div className="input-group-prepend"> 
                                    <div className="input-group-prepend"> 
                                        <button className="btn btn-dark dropdown-toggle btn-block" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Debtor</button> 
                                        <div id = {this.props.dropDownId}  className="dropdown-menu"> 
                                            <User_drop_down_list users = { this.props.userNames } inputFieldId={this.props.inputFieldId} />
                                        </div> 
                                </div> 
                            </div> 
                            <input readOnly = {true} id = {this.props.inputFieldId} name="debtor" type="text" className="form-control" placeholder="Bitch"/> 
                            <input name="email" type="number" className="form-control" placeholder="Debt"/>
                            <div id = {this.props.removeButtonId}>
                                <a href="#">  <i className="fa fa-times ml-2 mt-2 "  aria-hidden="true" style = {{color: 'black' }} ></i> </a>
                            </div>
                            </div> 
                        </div> </React.Fragment>)
    }

}


function renderDropDownList(userNames,id) {
    ReactDOM.render(
        <User_drop_down_list users={ userNames } />, document.getElementById(id)
    )
}
$(document).ready(function () {

    $(document).on('click', "#creditor-drop-down a" ,function() {
        $("#creditor-field").val($(this).text());
    })

    $(document).on('click', "#method-payment-dropdown a" ,function() {
        $("#method-payment-field").val($(this).text());
    })


    $(document).on('click', "#debtor-drop-down-1 a" ,function() {
        $("#debtor-field-1").val($(this).text());
    })

    
    $("#debtor-remove-1").click(function() {
        $("#debtor-1").remove();
        if($("#method-payment-field").val() == "Evenly") {
                $("#split-evenly").trigger("click");
        }
        $("#alert-warning").hide(500);

    })

    $("#split-evenly").click(function () {
        console.log('evenly trigged');
        $("div input:nth-of-type(2)").each( function () {
            $(this).attr("readonly", true);
            let divCreditBy = $("div input:nth-of-type(2)").length;
            let credit = parseFloat($("#credit").val());

            let debt = credit/divCreditBy; 
            $(this).val(debt.toFixed(2));
        })
    })
    $("#split-manual").click(function() {

        $("div input:nth-of-type(2)").each( function () {
            $(this).attr("readonly", false);
        })
    })

    $("#credit").on('keyup', function (e) {
            if($("#method-payment-field").val() == "Evenly") {
                $("#split-evenly").trigger("click");
            }
    });

    // debtor-drop-down
    $(document).on('click', "#add-debtor-link", function (){
        
        if($("#debtors-group").children().length == userNames.length) {
            $("#alert-warning").show( function() {
            });
            return;
        }
        
        counter ++;

        let newDeptorId = "debtor-" + String(counter);
        let dropDownId = "debtor-drop-down-" +  String(counter);

        let inputFieldId = "debtor-field-" +  String(counter);
        let removeButtonId = 'debtor-remove-' + String(counter);

        $("#debtors-group").append('<div id ="' + newDeptorId + '"> </div>')

        ReactDOM.render(
            <Debtor  userNames={ userNames } dropDownId={ dropDownId} inputFieldId={inputFieldId} removeButtonId = {removeButtonId}  />, document.getElementById(newDeptorId)
        )
        $("#" + removeButtonId).click(function () {
            $("#" + newDeptorId).remove();
            if($("#method-payment-field").val() == "Evenly") {
                $("#split-evenly").trigger("click");
            }
            $("#alert-warning").hide(500);
        })

        if($("#method-payment-field").val() == "Evenly") {
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
                    let elementToAppendDataTo = "creditor-drop-down"; 
                    renderDropDownList(returnedData ,elementToAppendDataTo);

                    elementToAppendDataTo = "debtor-drop-down-1";
                    renderDropDownList(returnedData ,elementToAppendDataTo); 
                }
            });
        }
    })
})