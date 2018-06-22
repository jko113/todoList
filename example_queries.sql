--Get all the todos
SELECT * FROM Todos;

--GET one todo by ID
SELECT * FROM Todos
WHERE Id = 2;

--Get all uncompleted todos
SELECT * FROM Todos
WHERE IsDone = false;

--Get all completed todos
SELECT * FROM Todos
WHERE IsDone = true;

--search by title, should have 0 results
SELECT * FROM Todos
WHERE title LIKE '%zzzz%';

--Check a single row
UPDATE Todos
SET IsDone = TRUE
WHERE Id = 2 AND IsDone = FALSE;

--Uncheck a single row
UPDATE Todos
SET IsDone = FALSE
WHERE Id = 3 AND IsDone = TRUE;

--Change title for a todo
UPDATE Todos
SET Title = 'Roll some burritos'
WHERE Id = 2;