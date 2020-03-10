const Sequelize = require('sequelize');
const sequelize = require('../services/sqlService');

let MessageModelDefinition = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'group',
            key: 'id'
        }
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
            model: 'user',
            key: 'id'
        }
    },
    messageText: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    timeSent: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
};

let MessageModelOptions = {
    timestamps: false
};

const MessageModel = sequelize.define('message', MessageModelDefinition, MessageModelOptions);

MessageModel.prototype.getMessageId = function () {
    return this.getDataValue('id');
}

MessageModel.prototype.getGroupId = function () {
    return this.getDataValue('groupId');
}


MessageModel.prototype.getUserId = function () {
    return this.getDataValue('userId');
}

MessageModel.prototype.getMessageText = function () {
    return this.getDataValue('messageText');
}

MessageModel.prototype.getTimeSent = function () {
    return this.getDataValue('timeSent');
}

MessageModel.getGroupMessages = function (groupId) {
    return this.findAll({where: {groupId: groupId }});
};


module.exports = MessageModel;