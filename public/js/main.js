var evt = new CustomEvent('buttons-created', {state: "done"})
var user;

function getAllUsers() {
    return new Promise( (resolve, reject) => {
        $.ajax({
            url: '/api/get-users',
            type: "GET",
            success: function(returnedData) {
                // console.log(returnedData);
                resolve(returnedData);
            },
            error: function(error) {
                console.log(error);
                reject(error);
            }
        })
    });
}
getAllUsers().then( res => console.log('results from get request are' , res));

function  createAutoSuggest() {

}


class Userbutton extends React.Component {
    render() {
        return (<a className="btn btn-danger btn-lg mr-1" href="#" role="button">{this.props.userFirstName}</a>);
    }
}

class Group extends React.Component {
    render() {

        let userNamesAndIds = this.props.users;
        let usernames = userNamesAndIds.map((user) => {
            // if (typeof us) user[0]);
            if(user.constructor === Array) {
                return user[0];
            }
            else {
                return user.firstName;
            }
        })

        const buttons = usernames.map(username => <Userbutton userFirstName={username} />)
        return (<React.Fragment> {buttons} </React.Fragment>)
    }
}

$(document).ready(function () {
    console.log('Lets make the buttons in group');
    var getCurrentUser = $.ajax({
        url: '/api/get-current-user',
        type: 'GET',
        success: function(User){
            user = User;
            console.log('User got ', user);
        }
    })
    var getUsersInGroupRequest = $.ajax({ 
        url: '/api/get-users-in-group',
        type: 'POST',
        success: function(usersInGroup){
            console.log('get users ajax returned: ', usersInGroup);
            ReactDOM.render(
                <Group users={ usersInGroup } />, document.getElementById("usersInGroup")
            )
            window.dispatchEvent(evt);
        }
    })

    var add_in_group_suggestions = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace, // see its meaning above
        queryTokenizer: Bloodhound.tokenizers.whitespace, // see its meaning above
        local: [['Apostolis Gerodimos', 'Filipas Gerodimos', 'Arguris', 'Alex', 'Fontas', 'Bagelis', 'Nikos', 'Kalantzis', 'Gallis', 'Kostas'],[1,2]] 
    });

    $('#add-user-in-group-field').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
        {
            name: 'add_in_group_suggestions',
            source: substringMatcher(add_in_group_suggestions)  // Bloodhound instance is passed as the source
        });

    
});
    
function renderGroup(users) {
    console.log(users)
    ReactDOM.render(
        <Group users={users} />, document.getElementById("usersInGroup"))
}

$('#add-user-form').submit(function (event) {
    event.preventDefault();

    let data = $(this).serializeArray();
    data[0].user = user;

    var request = $.ajax({
        url: '/add-user-in-group',
        type: "POST",
        data: data[0],
        dataType: "json",
        success: function (returnedData) {
            $("#strong-added-success").text(data[0].value);
            $("#user-added-success").show(function () {
                var myVar = setInterval(myTimer, 3000);

                function myTimer() {
                    $('#addUserForm').modal('hide');
                    window.clearInterval(myVar);
                }

            });
            console.log(returnedData.group);
            renderGroup(returnedData.group);

        }
    });
});


var substringMatcher = function (strs) {
    
    return function findMatches(q, cb) {
        console.log('strs', strs);
        console.log('q', q);
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];
        console.log('matches', matches);

        // regex used to determine if a string contains the substring `q`
        let substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs.local[0], function (i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        console.log('matches', matches);

        cb(matches);
    };
};