const express = require("express");
const app = express();
// const server = require("http").createServer(app);

const fs = require('fs');
const options = {
  key: fs.readFileSync("/home/tolis/Desktop/dev/Home-Site/server.key"),
  cert: fs.readFileSync("/home/tolis/Desktop/dev/Home-Site/server.cert")
};
const server = require("https").createServer(options, app);
var io = require("./services/socketService")(server);
const bodyParser = require("body-parser");
var cors = require("cors");
var passport = require("passport");
var morgan = require("morgan");
const session = require("express-session");

const passportService = require("./services/passportService");
const signUpController = require("./controllers/signUpController");
const signOutController = require("./controllers/signOutController");
const expensesController = require("./controllers/expensesController");
const homeController = require('./controllers/homeContoller');
const apiController = require('./controllers/apiController');
const logInController = require('./controllers/logInController');

// Initialize server
server.listen(process.env.PORT || 8082, '192.168.1.14', () => {
  console.log(`app is now listening to port ${process.env.PORT || 8082}`);
  console.log(__dirname);
});

// Hook up the HTTP logger.
app.use(morgan("dev"));

// Serve static files like css, images
app.use("/public", express.static(__dirname + "/public"));
app.use(cors());

//Be able to parse the body of requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add Express Cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// Create Session to be used by passport

// Add Sql Session MemoryStore
const MySQLStore = require('express-mysql-session')(session);


let sqlOptions = {
  host: '192.168.1.7',
  port: 3306,
  user: 'root',
  password: 'tolis',
  database: 'home_site'
}
let sessionStore = new MySQLStore(sqlOptions);

app.use(
  session({
    key: 'session_cookie_name',
    secret: "session_cookie_secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: true,
      httpOnly: true,
      // expires: true,
      // maxAge: 5000
    }

  })
);

// Init the passport...
app.use(passport.initialize());
app.use(passport.session());
passportService.passportConfigure(passport);


// Set render engine
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
let User = require('./model/User');

//Log-in page
app.use("/", logInController);

//Home page
app.use("/home", homeController);

//Sign up page
app.use("/sign-up", signUpController);

//Sign out route
app.use("/sign-out", signOutController)

//expenses page
app.use("/home/expenses", expensesController);

//get api services
app.use('/api', apiController);

const userService = require('./services/userService')();
const groupService = require('./services/groupService')();

app.post("/add-user-in-group", function (req, res, next) {
  userService.getUserIdbyName(req.body.value).then((userToAddId) => {
    let userInGroupId = req.body['user[id]'];
    groupService.addUserToGroup(userToAddId, userInGroupId, function (wasCreated, groupUsers) {
      if (wasCreated) {
        console.log('create group ok');
        groupUsers.then(group => res.json({ group: group }));

      }
      else {
        console.log('create group fail');
      }
    });

  });


})


const webpush = require('web-push');

const publicVapidKey = 'BMKMaCxQjf2NtwfODDDx5wCBW51kMsomozcyvFK_O1NUjyS8xspuZDPoKOEMXZoPxS3g5dAvFNxUNpWkvBRqjV4'
const privateVapidKey = 'PBDKERhv9kEHJhOBPGrD2rcHRM_BtTvuHMXEbkDJq9g'

webpush.setVapidDetails('mailto:tolisgerodimos94@gmail.com', publicVapidKey, privateVapidKey);

app.post('/subscribe', (req, res) => {
  // Get pushSubsription object
  const subscription = req.body;

  // Send 201 - resource created;
  res.status(201).json({});

  //Create payload
  const payload = JSON.stringify({ title: 'Push Test', hiddenData: 'Specific parameters for action' });

  //Pass object into SendNotification
  webpush.sendNotification(subscription, payload).catch(error => console.error(error))
})

