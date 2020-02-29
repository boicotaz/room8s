var apiController = require('express').Router();
var groupService = require('../services/groupService')();
var userService = require('../services/userService')();

apiController.post('/get-users-in-group', function(req,res) {
    let user
    if (!req.body)  user = req.body;
    else user = req.user;
    groupService.findGroupByUserId(user.id).then((group) => {
        groupService.findUsersInGroup(group.getGroupId()).then( (users) => {
            let userNamesAndIds = users.map( userInGroup => [userInGroup.firstName, userInGroup.id] );
            res.json(userNamesAndIds);
        });
    })
});

apiController.get('/get-current-user', function (req,res) {
    res.json(req.user);
});


apiController.get('/get-users', function(req,res) {
    userService.getAllUsers().then(results => res.json(results)  )
})

apiController.get('/get-group-details', function(req,res) {
    groupService.findGroupByUserId(req.user.id).then(group => res.json({groupName : group.getGroupName(), groupId: group.getGroupId() }));
})

module.exports = apiController;