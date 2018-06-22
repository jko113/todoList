const express = require("express");
const app = express();
const Todo = require("./db");
const port = 4321;

app.get("/", (req, res) => {
    Todo.getAll()
        .then(data => res.send(data))
        .catch(error => console.error(error));
});

app.get("/:id", (req, res) => {
    let id = req.params.id;
    Todo.getOne(id)
        .then(data => res.send(data))
        .catch(error => console.error(error));
});

app.listen(port, () => {
    console.log(`Your application is running at http://localhost:${port}`);
});