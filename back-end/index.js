const express = require("express");
//Initialize express
const app = express();
const bodyParser = require("body-parser");
//Initialize body-parser
app.use(bodyParser.json());
const server = require("http").createServer(app);
require('./api/userController')(app);

// Initialize server
server.listen(process.env.PORT || 8080, process.env.SERVER_IP || '0.0.0.0', () => {
    console.log(`app is now listening to port ${process.env.PORT || 8080} and Ip ${process.env.SERVER_IP || '0.0.0.0'} `);
    console.log(__dirname);
});

const db = require("./models");
db.sequelizeConnection.sync();

db.userModel.create({ firstName: "John", lastName: "Doe", password: "123456", email: "john.doe@example.com" });