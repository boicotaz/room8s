const express = require("express");
//Initialize express
const app = express();
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const usersController = require('./api/usersController');

// Initialize server
server.listen(process.env.PORT || 8080, process.env.SERVER_IP || '0.0.0.0', () => {
    console.log(`app is now listening to port ${process.env.PORT || 8080} and Ip ${process.env.SERVER_IP || '0.0.0.0'} `);
    console.log(__dirname);
});

//Initialize body-parser
app.use(bodyParser.json());


app.use("/users", usersController);