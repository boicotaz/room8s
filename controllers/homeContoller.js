const homeController = require('express').Router();
const passportService = require('../services/passportService');
const groupService = require('../services/groupService')();
const messageService = require('../services/messageService')();

const SessionService = require('../services/sessionService');
const sessionService = new SessionService();
const userService = require('../services/userService')();

homeController.get("/", passportService.authValidation, async (req, res, next) => {

    let group = await groupService.findGroupByUserId(req.user.id);

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
        req.user.groupId = "DYNO";
        res.render("main.ejs", { userHasGroup: true, user: req.user, groupName: groupName })
    }

});

homeController.post("/add-user-in-group", function (req, res, next) {
    userService.getUserIdbyName(req.body.fullName).then((userToAddId) => {
      let userInGroupId = req.user.id;
      groupService.addUserToGroup(userToAddId, userInGroupId, function (wasCreated, groupUsers) {
        if (wasCreated) {
          console.log('create group ok');
          groupUsers.then(group => res.redirect('/home'));
  
        }
        else {
          console.log('create group fail');
        }
      });
  
    });
  
  
  })


homeController.get("/get-group-messages", passportService.authValidation, async (req, res) => {


    group = await groupService.findGroupByUserId(req.user.id);

    messageService.getGroupMessages(group.getGroupId()).then(groupMessages => {
        res.json(groupMessages);
    });

})

homeController.post("/store-group-message", passportService.authValidation, async (req, res) => {
    console.log("reached home controller with data", req.body);
    let newMsg = req.body;
    messageService.storeNewGroupMessage(newMsg);
})

module.exports = homeController;