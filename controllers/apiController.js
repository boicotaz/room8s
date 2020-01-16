var apiController = require('express').Router();
var groupService = require('../services/groupService')();

apiController.post('/get-users-in-group', function(req,res) {
    let user = req.body;
    groupService.findGroupByUserId(user.id).then((group) => {
        groupService.findUsersInGroup(group.getGroupId()).then( (users) => {
            let userNamesAndIds = users.map( userInGroup => [userInGroup.firstName, userInGroup.id] );
            res.json(userNamesAndIds);
        });
    })
});


module.exports = apiController;