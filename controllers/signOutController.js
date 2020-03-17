var signOutController = require('express').Router();
var userService = require('../services/userService')();
var authValidation = require('../services/passportService').authValidation;
signOutController.get('/', authValidation, function (req, res, next) {
    
    console.log("ABOUT TO DELETE COOKIEEEEEEE____________________________________________________________________", req.cookies['remember_me'], req.remember_me, res.remember_me);
    if (req.cookies['remember_me'] != undefined) {
        console.log("ABOUT TO DELETE COOKIEEEEEEE", req.cookies['remember_me']);
        res.clearCookie('remember_me');
    }
    req.logout();
    res.redirect('/');
});



signOutController.get('/window_close', authValidation, function(req,res,next) {

    if(!req.remember_me){
        if (req.cookies['remember_me'] != undefined) {
            res.clearCookie('remember_me');
        }
        req.logout();
    }
})

module.exports = signOutController;