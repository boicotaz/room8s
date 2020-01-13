"use strict"
const groupModel = require('../model/Group');

function getGroupService() {
    var groupService = new GroupService(groupModel);
    return groupService;
}

class GroupService {
    constructor(groupModel) {
        this.groupModel = groupModel;
    }

    async findGroupByUserId(userId) {
        return this.groupModel.findGroupByUserId(userId);
    }

    async findUsersInGroup(groupId) {
        return this.groupModel.findUsersInGroup(groupId);
    }
}

module.exports = getGroupService;