const {Router} = require("express");
const router = Router();
const {UserService} = require("./user.service.js");
const {UserController} = require("./user.controller.js");
const { AuthorizationMiddleware } = require("../../../lib/midleware.js")

const midleware = new AuthorizationMiddleware();
const service = new UserService();
const controller = new UserController(service);

router.get("/get-users", midleware.checkUser, midleware.adminRole, async(req,res) => {
    const data = await controller.getAllUsers();
    res.json(data)
})
router.post("/register", async(req,res) => {
    const data = await controller.createUser(req,res);
    res.json(data);
})
router.post("/login", async(req,res) => {
    const data = await controller.login(req,res);
    res.header("token", data.data.token)
    res.json(data.data.foundUserByPhone)
})



module.exports = {router};

