const bcrypt = require('bcrypt');

module.exports = (sequelizeConnection, Sequelize) => {
    const userModel = sequelizeConnection.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,

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
            allowNull: true,
            defaultValue: null
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
        },
        // profImgExists: {
        //     type: Sequelize.BOOLEAN
        // },
        // googleId: {
        //     type: Sequelize.STRING,
        //     defaultValue: null
        // }
    }, {
        // instanceMethods: {
        //     comparePasswords: comparePasswords
        // },
        hooks: {
            // beforeValidate: hashPassword,
            beforeCreate: hashPassword
        },

        timestamps: false
    });

    return userModel;
};

// Hashes the password for a user object.
function hashPassword(user) {
    if (user.password == null) return null;

    return bcrypt.hash(user.password, 10).then(function (hashedPassword) {
        user.password = hashedPassword;
    });
}