const Sequelize = require('sequelize');
const sequelize = require('../services/sqlService');
const UserModel = sequelize.define('users', {
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
    }
    // id 
}, {timestamps: false});

// UserModel.findAll({attributes:['firstName', 'lastName', 'id', 'password', 'email' , 'phoneNumber', 'birthDate']}).then(users => {
//     console.log("All users:", JSON.stringify(users, null, 4));
//   });
UserModel.create({firstName: 'tolis', lastName: 'boicotaz', password: '123' , email: 'example@example.com', date: '1994-03-16'}).then()

sequelize.query("SELECT * FROM `users`", { type: sequelize.QueryTypes.SELECT})
  .then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
  })

  module.exports = UserModel;