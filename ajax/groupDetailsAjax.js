var evt = new CustomEvent('buttons-created', { state: "done" })

let getGroupDetails = function getGroupDetails() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/api/get-group-details',
            type: 'GET',
            success: function (groupDetails) {
                resolve(groupDetails);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}

let getUsersInGroup = function getUsersInGroup() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/api/get-users-in-group',
            type: 'POST',
            success: function (usersInGroup) {
                let usernamesInGroup = usersInGroup;
                window.dispatchEvent(evt);
                resolve(usersInGroup);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}
let grouDetailsAjax = {};

grouDetailsAjax.getGroupDetails = getGroupDetails;
grouDetailsAjax.getUsersInGroup = getUsersInGroup;

export { grouDetailsAjax }