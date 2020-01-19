var Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "mysql://root:tolis@192.168.1.3:3306/home_site"
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;


