const homeController = require('express').Router();
const passportService = require('../services/passportService');
const groupService = require('../services/groupService')();

homeController.get("/home", passportService.authValidation, async (req, res) => {
    console.log("Is the user authenticated? =>  " + req.isAuthenticated());
    console.log("Home Route");

    group = await groupService.findGroupByUserId(req.user.id);


    if (group == null) {
        res.render("main.ejs", { userHasGroup: false, user: req.user, groupName: null });
    }
    else {
        groupId = group.getGroupId();
        const [usersInGroup, groupName] = await Promise.all([
            groupService.findUsersInGroup(groupId), // online user count
            groupService.getGroupNameByGroupId(groupId), // register user
        ]);
        req.user.usersInGroup = usersInGroup;

        res.render("main.ejs", { userHasGroup: true, user: req.user, groupName: groupName })
    }

});

module.exports = homeController;