const usersController = require('express').Router();


usersController.get("/", (req, res) => {
    res.send("Users Controller says hello");
})

usersController.post("/validate", (req, res) => {
    console.log(req.body);
    res.send(req.body);
})


module.exports = usersController;