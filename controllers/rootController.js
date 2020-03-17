const rootController = require('express').Router();
const passport = require("passport");
const SessionService = require('../services/sessionService');
const sessionService = new SessionService();
const userService = require('../services/userService')();

rootController.get("/", async (req, res) => {
    // res.render("sign-in-room8s.ejs", { user: null, userAlreadyExists: null, mail: null });
    console.log(req.isAuthenticated(), "______________________________________________________-");
    if (req.isAuthenticated()) {
        res.redirect('/home');
    }
    else if (req.cookies['remember_me'] != undefined) {

        let session = await sessionService.findSessionBySessionId(req.cookies['remember_me']);
        let sessionData = JSON.parse(session.getSessionData());
        let userId = sessionData.passport.user;
        let user = await userService.getUserById(userId);

        req.login(user, () => {
            res.redirect('/home');
        });

    }
    else {
        res.render("sign-in-room8s.ejs", { user: null, userAlreadyExists: null, mail: null });
    }

});

rootController.post('/validate', function (req, res, next) {

    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.render("sign-in-room8s.ejs", { user: false, userAlreadyExists: null, mail: null });
        }
        req.logIn(user, async function (err) {
            if (err) { return next(err); }
            if (req.body.remember_me == 'on') {
                res.cookie('remember_me', req.sessionID, { path: '/', httpOnly: true, maxAge: 604800000, secure: true });
                // res.params.remember_me = true;
            }
            else {
                // res.params.remember_me = false;
                console.log("COOKIE COOKIE COOKIE!!!!!!!_______________________", req.cookies['remember_me']);
                if (req.cookies['remember_me'] != undefined) {
                    console.log("COOKIE SHOULD BE DELETED!!!!!!!_______________________");
                    res.clearCookie('remember_me');
                }
            }
            return res.redirect('/home');
        });
    })(req, res, next);
});

module.exports = rootController;