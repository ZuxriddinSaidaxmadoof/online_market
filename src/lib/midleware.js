const { ResData } = require("./resData");
const { verifyToken } = require("./jwt.js");
const path = require("path");
const { DataSource } = require("./dataSource.js");

class AuthorizationMiddleware {
  adminRole(req, res, next) {
    const userId = req.userId.id;

    const userPath = path.join(__dirname, "../../database", "users.json");
    const userDataSorce = new DataSource(userPath);
    const users = userDataSorce.read();

    const foundUser = users.find((user) => user.id === userId);
    if (foundUser && foundUser.role === "admin") {
      req.user = foundUser;
      return next();
    } else {
      const resData = new ResData("not access", 403);

      return res.status(resData.statusCode).json(resData);
    }
  }

  userRole(req, res, next) {
    const userId = req.userId;

    const userPath = path.join(__dirname, "../../database", "users.json");
    const userDataSorce = new DataSource(userPath);
    const users = userDataSorce.read();

    const foundUser = users.find((user) => user.id === userId);

    console.log(foundUser);
    if (foundUser && "user" === foundUser.role) {
      req.user = foundUser;
      return next();
    } else {
      const resData = new ResData("not access", 403);

      return res.status(resData.statusCode).json(resData);
    }
  }

  checkUser(req, res, next) {
    try {
      const token = req.headers.token;

      const userId = verifyToken(token);

      req.userId = userId;
      next();
    } catch (error) {
      console.log("error :", error);
      const resData = new ResData("invalid token", 401);
      res.status(resData.statusCode).json(resData);
    }
  }
}

module.exports = { AuthorizationMiddleware };
