
// var user;

// var usernames;
// var usernamesInGroup;


import MainPage from "../components/mainPage/MainPageComponent.jsx";
import { grouDetailsAjax } from "../ajax/groupDetailsAjax";
import { groupMessagesAjax } from "../ajax/groupMessagesAjax";
// import {getAllUsers} from "../ajax/userAjax";

var getMainPage = function (user) {

    if ($("#group-dashboard").length) return;

    $("#content").remove();
    $("#content-container").append("<div id = 'content'></div>")
    console.log("i was called__________________________________________________________________________");

    Promise.all([grouDetailsAjax.getUsersInGroupDetails(), grouDetailsAjax.getGroupDetails(), groupMessagesAjax.getGroupMessages()]).then((res) => {
        console.log('Results are from Promise.all: ', res);
        let [usersInGroup, groupDetails, groupMessages] = res;

        ReactDOM.render(
            <MainPage usersInGroup={usersInGroup} groupDetails={groupDetails} currentUser={user} groupMessages={groupMessages} > </MainPage>, document.getElementById('content')
        );
    }).catch((error) => console.log(error));
}

getMainPage(loggedInUser);
export { getMainPage };

