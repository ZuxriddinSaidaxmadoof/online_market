require("dotenv").config();
const port = process.env.SERVER_PORT
const jwtKey = process.env.JWT_KEY


module.exports = {port, jwtKey};
