// const userService = require('../services/userService');
const userModel = require("../models").userModel;
const userServiceClass = require('../services/userService');

module.exports = app => {
    const userServiceInstance = new userServiceClass(userModel);

    const userController = require('express').Router();

    userController.get("/", (req, res) => {
        res.send("Users Controller says hello");
    })

    userController.post("/validate", (req, res) => {
        let { email, password } = req.body;
        userServiceInstance.getUserbyEmail(req.body.email).then((user, error) => {
            if (!user) {
                console.log("No user found!");
                res.send(`User with mail: ${email} was not found!`);
            }
            else if (error) {
                res.status(500).json({ message: "There was an error!" });
                console.log(error);
            }
            else {
                userServiceInstance.validateUserPassword(user, password, (error, isMatch) => {
                    if (error) {
                        res.status(500).json({ message: "There was an error!" });
                        console.log(error);
                    }
                    else if (isMatch) {
                        res.send({ email: user.email, validate: "success" });
                    }
                    else {
                        res.send({ email: user.email, validate: "fail" });
                    }
                });
            }

        });

    });

    app.use("/user", userController);
}