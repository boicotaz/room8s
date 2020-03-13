

let configureClientSocket = function (user) {
    
    if (clientSocket === undefined) {
        var socket = io.connect();
        // socket = io.connect('http://localhost:8082/expenses');
        console.log('user logged in is=========',user.id);
        socket.emit('user_connected', user);
        document.addEventListener('LoggedInStatus', function (e) {
            console.log('EVENT FOR LOG STATUS CAUGHT SUCCESSFULLY with user', e.detail);
            let RequestFromUser = e.detail;
            socket.emit('get_logged_in_users', RequestFromUser);
        });
        socket.on('sent_logged_in_users', function (loggedInUsersId) {
            console.log('ABOUT TO INFORM HOME COMPONENT', loggedInUsersId);
            var getUserLoggedStatusEventReply = new CustomEvent('LoggedInStatusReply', { detail: loggedInUsersId });
            document.dispatchEvent(getUserLoggedStatusEventReply);
        })
        socket.on('user_in_my_group_connected', function (loggedInUsersId) {
            console.log("caught socket event user_in_my_group_connected____________________________", loggedInUsersId);
            let getUserLoggedStatusEventReply = new CustomEvent('LoggedInStatusReply', { detail: loggedInUsersId });
            document.dispatchEvent(getUserLoggedStatusEventReply);
        });

        socket.on('user_in_my_group_added_expense', function (expenseData) {
            console.log('i received the event change in expense table');
            let createEvent = new CustomEvent('new-expense', { detail: expenseData });
            document.dispatchEvent(createEvent);
        })
        socket.on('user_in_my_group_disconnected', function (disconnectedUserId) {
            console.log('disconnect event received by client', disconnectedUserId);
            let userLoggedOffEvent = new CustomEvent('LoggedOffStatus', { detail: disconnectedUserId });
            document.dispatchEvent(userLoggedOffEvent);
        });
    }
    return socket;
}

var clientSocket = configureClientSocket(loggedInUser);
// export { configureClientSocket };