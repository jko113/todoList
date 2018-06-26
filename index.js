const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const Todo = require("./db");
const port = 3000;
const hbs = require("express-handlebars");
const static = express.static;
const bodyParser = require("body-parser");

const setupAuth = require("./auth");
const ensureAuthenticated = require("./auth").ensureAuthenticated;

app.engine(".hbs", hbs({
    defaultLayout: "layout",
    extname: ".hbs"
}));
app.set("view engine", ".hbs");
app.use(static("public"));
app.use(bodyParser.urlencoded({extended: false}));
setupAuth(app);

app.get("/", (req, res) => {
    Todo.getAll()
        .then( (data) => {
            res.render("homepage", {
                todos: data
            });
        })
        .catch(error => console.error(error));
});

// app.post("/", (req, res) => {
//     console.log(req.body);
// });

app.get("/new", ensureAuthenticated, (req, res) => {
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
    let newTitle = req.body.newTitle;
    let isDone = req.body.isdone;
    console.log(req.body);

    if (isDone) {
        Todo.setFinished(id, true);
    }

    if (newTitle) {
        Todo.setTitle(id, newTitle)
        .then( () => {
            res.redirect("/" + id);
        })
    } else {
        res.redirect(`/${id}/edit`);
    }




});

app.get("/:id/delete", (req, res) => {
    let id = req.params.id;
    Todo.getOne(id)
    .then( (data) => {
        res.render("todo-delete-page", data);
    }).catch(data => console.error(error));
});

app.post("/:id/delete", (req, res) => {
    let id = req.params.id;
    Todo.deleteById(id)
        .then( () => {
            res.redirect("/");
        })
        .catch();
});

app.listen(port, () => {
    console.log(`Your application is running at http://localhost:${port}`);
});