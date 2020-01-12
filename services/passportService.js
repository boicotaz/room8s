const LocalStrategy = require("passport-local").Strategy;
var User = require("./../model/User.js");

function passportConfigure(passport) {
  passport.serializeUser((user, done) => {
    console.log("serialize routine with user id = " + user.id);
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    console.log("deserialize routine with key: " + id);
    User.findOne({ where: { id: id } }).then(user => done(null, user));
  });
  passport.use(
    "local",
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      (username, password, done) => {
        potentialUser = { where: { email: username } };
        User.findOne(potentialUser)
          .then(function (user, error) {
            if (!user) {
              return done(null, false);
            } else if (error) {
              return done(error);
            } else {
              user.comparePasswords(password, function (error, isMatch) {
                console.log(isMatch, error);
                if (isMatch && !error) {
                  return done(null, user);
                } else {
                  return done(null, false);
                }
              });
            }
          })
          .catch(function (error) {
            // res.status(500).json({ message: "There was an error!" });
            console.log(error);
          });
      }
    )
  );
}

function authValidation(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.user.firstName);
    return next();
  } else {
    res.redirect('/');
  }
}

module.exports = { passportConfigure, authValidation };
