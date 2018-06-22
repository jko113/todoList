const pgp = require("pg-promise")();
const cn = {
    host: "localhost",
    port: 5432,
    database: "todoList",
    user: "postgres",
    password: ""
}
const db = pgp(cn);

function getOne(id) {
    return db.oneOrNone('SELECT * FROM Todos WHERE Id = $1;', [id]);
}

function getAll() {
    return db.any('SELECT * FROM Todos;');
}

function getPending() {
    return db.any('SELECT * FROM Todos \
    WHERE IsDone = FALSE');
}

function getFinished() {
    return db.any('SELECT * FROM Todos \
    WHERE IsDone = TRUE');
}

function searchByTitle(searchString) {
    return db.any('SELECT * FROM Todos WHERE Title LIKE \'%$1#%\'', [searchString]);
}

function deleteById(id) {
    return db.result('DELETE FROM Todos WHERE Id=$1', [id]);
}

function setFinished(id, isDone) {
    return db.result("UPDATE Todos SET IsDone = $1 WHERE Id = $2", [isDone, id]);
}

function setTitle(id, newTitle) {
    return db.result("UPDATE Todos SET Title = \'$1#\' WHERE Id = $2", [newTitle, id]);
}

function add(title) {
    return db.one("INSERT INTO Todos (Title, IsDone) VALUES (\'$1#\', false) RETURNING ID", [title]);
}

module.exports = {
    getOne: getOne,
    getAll: getAll,
    getPending: getPending,
    getFinished: getFinished,
    searchByTitle: searchByTitle,
    deleteById: deleteById,
    setFinished: setFinished,
    setTitle: setTitle,
    add: add
};