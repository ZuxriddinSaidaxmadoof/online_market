const express = require("express");
const app = express();
const {port} = require("./config/index.js");
const routes = require("./src/routes/app_module.js")
const {join} = require("path")





app.set("views", join(__dirname, "src", "routes", "views"))
app.set("view engine", "ejs");

app.use(express.json());
app.use(require("cors")());
app.use("/", routes.router);

app.get("/", (req,res) => {
    res.render("index")
})


app.listen(port, () => {
    console.log(`Server run on port http://localhost:${port}`);
})
