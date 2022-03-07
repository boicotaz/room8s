class UserService {

    constructor(userModel) {
        this.userModel = userModel;
    }

    async getUserbyEmail(email) {
        // return this.userModel.findOne({ where: { email: email }, attributes: { exclude: ['password'] } });
        return this.userModel.findOne({ where: { email: email } });
    }

    validateUserPassword(user, password, callback) {
        user.comparePasswords(password, callback);
    }
}


module.exports = UserService;