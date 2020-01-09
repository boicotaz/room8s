const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
var cors = require("cors");
var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const sequelize = require("./services/sqlService");
var morgan = require("morgan");
const session = require("express-session");
const sessionStore = new session.MemoryStore();

const User = require("./model/User");

// Initialize server
server.listen(process.env.PORT || 8082, () => {
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

// Create Session to be used by passport
app.use(
  session({
    secret: "sdfsdfasdfasdfasdfsdaasdasdfasd",
    resave: true,
    saveUninitialized: true,
    key: "express.sid",
    store: sessionStore
  })
);

// Init the passport.
app.use(passport.initialize());
app.use(passport.session());
require("./services/passportService")(passport);

// Set render engine
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("sign-in-room8s.ejs");
});

app.get("/home", (req, res) => {
  console.log("Is the user authenticated? => " + req.isAuthenticated());
  res.render("main.ejs");
});

app.post(
  "/validate",
  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/home"
  })
);
