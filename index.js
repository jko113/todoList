const express = require("express");
const app = express();
const Todo = require("./db");
const port = 4321;
const hbs = require("express-handlebars");
const static = express.static;

app.engine(".hbs", hbs({
    defaultLayout: "layout",
    extname: ".hbs"
}));
app.set("view engine", ".hbs");
app.use(static("public"));

app.get("/", (req, res) => {
    Todo.getAll()
        .then( (data) => {
            // console.log(data);
            //res.send(data);
            res.render("homepage", {
                todos: data
            });
        })
        .catch(error => console.error(error));
});

app.get("/:id", (req, res) => {
    let id = req.params.id;
    Todo.getOne(id)
        .then((data) => {
            // res.send(data)
            res.render("todo-detail-page", data);
        })
        .catch(error => console.error(error));
});

app.listen(port, () => {
    console.log(`Your application is running at http://localhost:${port}`);
});