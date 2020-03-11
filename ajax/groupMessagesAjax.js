function  getGroupMessages() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/home/get-group-messages',
            method: 'GET',
            dataType: "json",
            success: function (groupMessages) {
                console.log('get group message data:', groupMessages);
                resolve(groupMessages);
            },
            error: function (error) {
                reject(error);
            }

        })
    });
}


export {getGroupMessages}