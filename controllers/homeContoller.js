const homeController = require('express').Router();
const passportService = require('../services/passportService');
const groupService = require('../services/groupService')();

homeController.get("/home", passportService.authValidation, async (req, res) => {
    console.log("Is the user authenticated? =>  " + req.isAuthenticated());
    console.log("Home Route");
    console.log(req.user.getGroupName());

    groupId = await groupService.findGroupByUserId(req.user.id);

    if (groupId == null) {
        res.render("main.ejs", { userHasGroup: false, user: req.user, groupName: null });
    }
    else {
        const [usersInGroup, groupName] = await Promise.all([
            groupService.findUsersInGroup(groupId), // online user count
            groupService.getGroupNameByGroupId(groupId), // register user
        ]);
        req.user.usersInGroup = usersInGroup;

        res.render("main.ejs", { userHasGroup: true, user: req.user, groupName: groupName })
    }

});

module.exports = homeController;