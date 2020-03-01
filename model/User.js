const Sequelize = require('sequelize');
const sequelize = require('../services/sqlService');
const bcrypt = require('bcrypt');

var userModelDefinition = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: Sequelize.BIGINT
    },
    birthDate: {
        type: Sequelize.DATEONLY
    },
    gender: {
        type: Sequelize.STRING
    }
};

var userModelOptions = {
    // instanceMethods: {
    //     comparePasswords: comparePasswords
    // },
    hooks: {
        // beforeValidate: hashPassword,
        beforeCreate: hashPassword
    },

    timestamps: false
};

const UserModel = sequelize.define('users', userModelDefinition, userModelOptions);


// Compares two passwords.
UserModel.prototype.comparePasswords = function comparePasswords(password, callback) {
    // console.log(password, this.password);
    bcrypt.compare(password, this.password, function (error, isMatch) {
        // console.log(isMatch);
        if (error) {
            return callback(error);
        }

        return callback(null, isMatch);
    });
}
UserModel.prototype.getUserId = function getUserId() {
    return this.getDataValue('id');
}

UserModel.prototype.getUserFirstName = function getUserName(){
    return this.getDataValue('firstName');
}

UserModel.prototype.getUserLastName = function getUserName(){
    return this.getDataValue('lastName');
}

// Hashes the password for a user object.
function hashPassword(user) {
    if (user.changed('password')) {
        return bcrypt.hash(user.password, 10).then(function (password) {
            user.password = password;
        });
    }
    else {
        return bcrypt.hash(user.password, 10).then(function (password) {
            // console.log('password from hash is: ', password);
            // console.log(user.password);
            user.password = password;
        });
    }
}

UserModel.getUserIdbyEmail = async function (email) {
    return this.findOne({ where: { email: email } }).then((user) => { console.log(user.getUserId()); return user.getUserId() })

}
UserModel.getUserIdbyName = async function(name) {
    return this.findOne({ where: { firstName: name[0], lastName: name[1] } }).then((user) => { console.log(user.getUserId()); return user.getUserId() })
}

UserModel.getAllUsers = async function () {
     return await UserModel.findAll().then((users) => {
         let userNamesAndIds = users.map( (user) => {return [user.firstName + " " + user.lastName, user.id] }  );
         return userNamesAndIds
     });
}


module.exports = UserModel;