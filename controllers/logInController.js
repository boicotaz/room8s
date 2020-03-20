const logInController = require('express').Router();
const passport = require("passport");
const SessionService = require('../services/sessionService');
const sessionService = new SessionService();
const userService = require('../services/userService')();

logInController.get("/", async (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/home');
    }
    else if (req.cookies['remember_me'] != undefined) {

        sessionService.findSessionBySessionId(req.cookies['remember_me']).then(session => {

            if (session == null || session == undefined) res.render("sign-in-room8s.ejs", { user: null, userAlreadyExists: null, mail: null });
            if (Array.isArray(session) && session.length) {
                let sessionDataJsonString = session[0].getSessionData();
                let sessionData = JSON.parse(sessionDataJsonString);

                let userId = sessionData.passport.user;
                if (userId != undefined) {
                    userService.getUserById(userId).then(user => {
                        if (req.cookies['remember_me'] != req.sessionID) {
                            sessionService.deleteSessionById(req.cookies['remember_me']);
                            res.clearCookie('remember_me');
                            res.cookie('remember_me', req.sessionID, { path: '/', httpOnly: true, maxAge: 604800000, secure: true }); // TO DO: sortain the age

                            sessionService.updatePersistsById(req.sessionID);
                            sessionService.deleteSessionById(req.cookies['remember_me']);
                        }
                        req.login(user, () => {
                            res.redirect('/home');
                        });
                    });

                }
                else {
                    res.render("sign-in-room8s.ejs", { user: null, userAlreadyExists: null, mail: null });
                }

            }
            else {
                res.render("sign-in-room8s.ejs", { user: null, userAlreadyExists: null, mail: null });
            }
        }).catch(e => {
            console.log(e);
            res.render("sign-in-room8s.ejs", { user: null, userAlreadyExists: null, mail: null });
        })


    }
    else {
        res.render("sign-in-room8s.ejs", { user: null, userAlreadyExists: null, mail: null });
    }

});

logInController.post('/validate', function (req, res, next) {

    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        else if (!user) {
            return res.render("sign-in-room8s.ejs", { user: false, userAlreadyExists: null, mail: null });
        }
        else {
            req.logIn(user, async function (err) {
                if (err) { return next(err); }
                if (req.body.remember_me == 'on') {
                    if (req.cookies['remember_me'] != undefined) {
                        res.clearCookie('remember_me');
                    }
                    res.cookie('remember_me', req.sessionID, { path: '/', httpOnly: true, maxAge: 604800000, secure: true }); // TO DO: sortain the age
                    // console.log("Session Id is ______________________________________________")
                    sessionService.updatePersistsById(req.sessionID);
                }
                else {
                    if (req.cookies['remember_me'] != undefined) {
                        res.clearCookie('remember_me');
                    }
                }
                return res.redirect('/home');
            });
        }

    })(req, res, next);
});

module.exports = logInController;