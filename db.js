const pgp = require("pg-promise")();
const cn = {
    host: "localhost",
    port: 5432,
    database: "todoList",
    user: "postgres",
    password: ""
}
const db = pgp(cn);

function getTodo(id) {
    db.any('SELECT * FROM Todos WHERE Id = $1;', [id])
        .then(function(data) {
            // success;
            console.log(data);
        })
        .catch(function(error) {
            // error;
            console.error(error);
        });
}

// getTodo(7);

module.exports = {
    getTodo: getTodo
};