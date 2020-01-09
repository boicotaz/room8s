const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
var cors = require("cors");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// var mysql = require("mysql");
var sequelize = require("./services/sqlService");
var morgan = require('morgan');
// const jwt = require('jsonwebtoken');


const session = require('express-session');
const sessionStore = new session.MemoryStore();


const User = require("./model/User");


// Initialize server
server.listen(process.env.PORT || 8082, () => {
  console.log(`app is now listening to port ${process.env.PORT || 8082}`);
  console.log(__dirname);
});

// Hook up the HTTP logger.
app.use(morgan('dev'));
//  Hook up Passport for authentication


// Hook the passport strategy.
// var validateRouter = require('./services/passportStrategyService');
// app.use('/validate', validateRouter);



app.use("/public", express.static(__dirname + "/public"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(session({ secret: 'sdfsdfasdfasdfasdfsdaasdasdfasd', resave: true, saveUninitialized: true, key: 'express.sid', store: sessionStore }));


// app.use(express.json());
// app.use(express.urlencoded());

//set render engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
// var router = app.Router();

app.get("/", (req, res) => {
  res.render("sign-in-room8s.ejs");
});


app.get("/home", (req, res) => {
  console.log('Is the user authenticated? => ' + req.isAuthenticated());
  res.render("main.ejs");
});



app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {

  console.log("serialize routine with user id = " + user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {

  console.log('deserialize routine with key:  ');
  User.findOne({ where: { 'id': id } }).then(user => done(null, user));
});

passport.use('local', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (username, password, done) => {
  potentialUser = { where: { email: username } };
  User.findOne(potentialUser).then(function (user, error) {
    if (!user) {
      return done(null, false);
    } else if (error) {
      return done(error);
    }
    else {
      user.comparePasswords(password, function (error, isMatch) {
        console.log(isMatch, error);
        if (isMatch && !error) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  }).catch(function (error) {
    res.status(500).json({ message: 'There was an error!' });
  });
}));


app.post("/validate", passport.authenticate('local', { failureRedirect: "/", successRedirect: "/home" }));



