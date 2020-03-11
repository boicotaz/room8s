function getAllUsers() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/api/get-users',
            type: "GET",
            success: function (returnedData) {
                resolve(returnedData);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}

function getCurrentUser() {
    return new Promise((resolve,reject) => {
        $.ajax({
            url: '/api/get-current-user',
            type: 'GET',
            success: function (currentUser){
                resolve(currentUser);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}


export {getAllUsers,getCurrentUser}