var evt = new CustomEvent('buttons-created', {state: "done"})
var user;

var usernames;
var usernamesInGroup;



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

function getUsersInGroup() {
    return new Promise((resolve,reject) => {
        $.ajax({ 
            url: '/api/get-users-in-group',
            type: 'POST',
            success: function(usersInGroup){
                usernamesInGroup = usersInGroup;
                // console.log('get users ajax returned: ', usersInGroup);
                ReactDOM.render(
                    <Group users={ usersInGroup } />, document.getElementById("usersInGroup")
                )
                window.dispatchEvent(evt);
                resolve(usersInGroup);
            },
            error: function(error) {
                console.log(error);
                reject(error);
            }
        })
    })
}


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
            // console.log('User got ', user);
        }
    })

    // let usersInGroupPromise = getUsersInGroup();

    Promise.all([getAllUsers(), getUsersInGroup()]).then(function(values) {
        // console.log('All users are: ' , values[0]);
        // console.log('Users in group are: ', values[1]);
        let allUsers =  values[0];
        let groupUsers = values[1];

        let idsInGroup = groupUsers.map( elem => elem[1]);
        // console.log(idsInGroup);

        //search bar suggestions

        console.log(allUsers.map(elem => elem[0]));
        var users_suggestions = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace, // see its meaning above
            queryTokenizer: Bloodhound.tokenizers.whitespace, // see its meaning above
            local: allUsers
        });

        $('#search-bar').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
            {
                name: 'user_suggestions',
                source: substringMatcher(users_suggestions)  // Bloodhound instance is passed as the source
            });


        // group suggestions
        let correctUsers = allUsers.filter((elem) => {
            if ( !idsInGroup.includes(elem[1]) ) return elem;
        });

        var add_in_group_suggestions = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace, // see its meaning above
            queryTokenizer: Bloodhound.tokenizers.whitespace, // see its meaning above
            local: correctUsers
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

});
    
function renderGroup(users) {

    ReactDOM.render(
        <Group users={users} />, document.getElementById("usersInGroup"))
}

$('#add-user-form').submit(function (event) {
    event.preventDefault();

    let data = $(this).serializeArray();
    data[0].user = user;
    console.log(data);

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
            // console.log(returnedData.group);
            renderGroup(returnedData.group);

        }
    });
});


var substringMatcher = function (strs) {
    
    return function findMatches(q, cb) {
        var matches, substringRegex;
        let stringsToMatch = strs.local.map(entry => entry[0])
        console.log(stringsToMatch);
        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        let substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(stringsToMatch, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};