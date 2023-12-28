const {Router} = require("express");
const router = Router();
const {UserService} = require("./user.service.js");
const {UserController} = require("./user.controller.js")

const service = new UserService();
const controller = new UserController(service);

router.get("/users", (req,res) => {
    const data = controller.getAllUsers();
    res.send(data)
})


module.exports = {router};

