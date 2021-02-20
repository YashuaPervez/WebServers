const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
//app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.url} - ${req.method}`;

    console.log(log);
    fs.appendFile("server.log", log + "\n", (err) => {
        if(err){
            console.log("Unable to append to server.js");
        }else{
            console.log("Log appended successfully");
        }
    });

    next();
});

// app.use((req, res, next) => {
//     res.render("mantainance.hbs");
// });

hbs.registerHelper("getYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("author", () => {
    return "Yashua.io";
});

app.get('/', (req, res) => {
    res.render("home.hbs", {
        welcomeMessage: "Hi, Welcome to your Express Server",
    });
});

app.get("/about", (req, res) => {
    res.render("about.hbs");
});

app.get("/projects", (req, res) => {
    res.render("projects.hbs")
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});