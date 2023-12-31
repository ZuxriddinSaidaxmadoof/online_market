const express = require("express");
const app = express();
const {port} = require("./config/index.js");
const routes = require("./src/routes/app_module.js")
const {join} = require("path")




app.use(express.json());
app.use(require("cors")());
app.use("/api", routes.router);


app.listen(port, () => {
    console.log(`Server run on port http://localhost:${port}`);
})
