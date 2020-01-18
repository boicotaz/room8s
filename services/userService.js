
"use strict"
const UserModel = require('../model/User');

function getUserService() {
    var userService = new UserService(UserModel);
    return userService;
}

class UserService {

    constructor(userModel) {
        this.userModel = userModel;
    }

    createUser(options, done) {
        this.userModel.findOne({ where: { email: options.email } }).then((user) => {
            if (user != null) {
                return done(false, user);
            }
            else {
                options.phoneNumber = parseInt(options.phoneNumber);
                if (options.birthDate == '') options.birthDate = null;
                this.userModel.create(options).then(function (user) {
                    return done(true, user);
                })
            }
        });
    };

    async getUserIdbyEmail(email) {
        return this.userModel.getUserIdbyEmail(email);
    }

    async getUserIdbyName(name) {
        // console.log(name.split(" "));
        return this.userModel.getUserIdbyName(name.split(" "));
    }

    async getAllUsers() {
        return this.userModel.getAllUsers();
    }
}


module.exports = getUserService;