"use strict"
const sessionModel = require('../model/Session');

class SessionService {
    constructor() {
        this.sessionModel = sessionModel
    }

    findSessionBySessionId(sessionId) {
        return this.sessionModel.findSessionBySessionId(sessionId);
    }
}

module.exports = SessionService;