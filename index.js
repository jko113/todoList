const express = require("express");
const app = express();
const Todo = require("./db");
const port = 4321;
const hbs = require("express-handlebars");
const static = express.static;
const bodyParser = require("body-parser");

app.engine(".hbs", hbs({
    defaultLayout: "layout",
    extname: ".hbs"
}));
app.set("view engine", ".hbs");
app.use(static("public"));
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    Todo.getAll()
        .then( (data) => {
            res.render("homepage", {
                todos: data
            });
        })
        .catch(error => console.error(error));
});

app.get("/new", (req, res) => {
    res.render("todo-create-page");
});

app.post("/new", (req, res) => {
    Todo.add(req.body.title)
        .then( (returnVal) => {
            res.redirect("/" + returnVal.id);
        })
});

app.get("/:id", (req, res) => {
    let id = req.params.id;
    Todo.getOne(id)
        .then((data) => {
            res.render("todo-detail-page", data);
        })
        .catch(error => console.error(error));
});

app.get("/:id/edit", (req, res) => {
    let id = req.params.id;
    Todo.getOne(id)
        .then( (data) => {
            res.render("todo-edit-page", {
                data: data
            });
        })
        .catch((error) => {
            console.log(error.message);
        });
});

app.post("/:id/edit", (req, res) => {
    let id = req.params.id;
    Todo.setTitle(id, req.body.newTitle)
    .then( () => {
        res.redirect("/" + id);
    })
});

app.listen(port, () => {
    console.log(`Your application is running at http://localhost:${port}`);
});