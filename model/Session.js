const Sequelize = require('sequelize');
const sequelize = require('../services/sqlService');


var sessionModelDefinition = {
    session_id: {
        type: Sequelize.STRING(128),
        allowNull: false,
        primaryKey: true
    },
    expires: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    data: {
        type: Sequelize.TEXT,
        defaultValue: null
    }
};

let SessionModelOptions = {
    timestamps: false
};


const SessionModel = sequelize.define('session', sessionModelDefinition, SessionModelOptions);


SessionModel.prototype.getSessionId = function () {
    return this.getDataValue('session_id');
}

SessionModel.prototype.getSessionExpires = function () {
    return this.getDataValue('expires');
}


SessionModel.prototype.getSessionData = function () {
    return this.getDataValue('data');
}


SessionModel.findSessionBySessionId = function (sessionId) {
    return this.findOne({ where: { session_id: sessionId } });
};

// SessionModel.findAll().then(res => console.log(res));
module.exports = SessionModel;