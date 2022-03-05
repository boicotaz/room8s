module.exports = (sequelizeConnection, Sequelize) => {
    const userModel = sequelizeConnection.define("user", {
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
    });

    return userModel;
};