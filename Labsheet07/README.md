# Lab Sheet 7: Database Management & SQL Queries (`college_db`)
**COER University, Roorkee — Department of Computer Science & Engineering**  
**Course:** Full Stack Web Development (Relational Database Management)

---

## 📌 Database Schema & Architecture

The database `college_db` models a university academic management system with 4 relational tables:
1. `departments` (`dept_id` [PK], `dept_name` [UNIQUE])
2. `students` (`student_id` [PK], `name`, `age` [CHECK >= 17], `city`, `dept_id` [FK])
3. `courses` (`course_id` [PK], `title`, `credits`, `dept_id` [FK])
4. `enrollments` (`student_id` [FK], `course_id` [FK], `marks`, [Composite PK])

### 📁 Files in this Directory
- `schema.sql` — Creates `college_db`, defines tables with constraints, and seeds 8 students, 4 departments, 5 courses, and 11 enrollments.
- `solutions.sql` — Complete SQL solution file covering Parts A to H.
- `run-sql.js` — Interactive Node.js test engine using built-in `node:sqlite` to execute and display formatted ASCII tables in the terminal.
- `README.md` — Complete question-by-question lab report.

---

## 📝 Task Solutions & Query Guide

### Part A: DDL (Data Definition Language)
- **A1:** `CREATE TABLE faculty (faculty_id INT PRIMARY KEY, name VARCHAR(50) NOT NULL, email VARCHAR(100) UNIQUE, salary DECIMAL(10,2), dept_id INT, FOREIGN KEY (dept_id) REFERENCES departments(dept_id));`
- **A2:** `ALTER TABLE faculty ADD COLUMN phone VARCHAR(15);`
- **A3:** `ALTER TABLE faculty RENAME COLUMN phone TO contact_no;`
- **A4:** `ALTER TABLE faculty DROP COLUMN contact_no;`
- **A5:** `DROP TABLE IF EXISTS faculty;`
- **Theory: DROP vs TRUNCATE vs DELETE:**
  - `DROP` (DDL): Deletes table structure, indexes, and data permanently from data dictionary.
  - `TRUNCATE` (DDL): Deallocates all data pages in one operation, resets auto-increment, preserves table schema.
  - `DELETE` (DML): Removes specific rows row-by-row matching a `WHERE` condition. Can be rolled back inside transactions.

---

### Part B: DML (Data Manipulation Language)
- **B1:** `INSERT INTO students (student_id, name, age, city, dept_id) VALUES (109, 'Neha', 20, 'Roorkee', 1);`
- **B2:** `INSERT INTO students (student_id, name, age, dept_id) VALUES (110, 'Karan', 21, 2);` &rarr; Value stored for city is `NULL`.
- **B3:** `UPDATE students SET city = 'Roorkee' WHERE student_id = 105;`
- **B4:** `UPDATE enrollments SET marks = marks + 5 WHERE course_id = 203;`
- **B5:** `DELETE FROM students WHERE student_id IN (109, 110);`
- **B6 Check Constraint Violation:**
  ```sql
  INSERT INTO students VALUES (111, 'Ananya', 15, 'Delhi', 1);
  -- Error: Check constraint 'students_chk_1' is violated. (age >= 17)
  ```

---

### Part C: Querying with SELECT
- **C1:** `SELECT * FROM students;`
- **C2:** `SELECT name, city FROM students;`
- **C3:** `SELECT * FROM students WHERE city = 'Roorkee';`
- **C4:** `SELECT * FROM students WHERE age BETWEEN 20 AND 22;`
- **C5:** `SELECT * FROM students WHERE city IN ('Roorkee', 'Dehradun');`
- **C6:** `SELECT * FROM students WHERE name LIKE 'A%';`
- **C7:** `SELECT * FROM students WHERE dept_id IS NULL;` &rarr; Returns Vikram (107).
- **C8:** `SELECT DISTINCT city FROM students WHERE city IS NOT NULL;`
- **C9:** `SELECT * FROM students ORDER BY age DESC, name ASC;`
- **C10:** `SELECT * FROM students ORDER BY age DESC LIMIT 3;`
- **C11:** `SELECT name AS "Student Name", age AS "Age" FROM students;`

---

### Part D: Functions and Aggregation
- **D1:** `SELECT COUNT(*) AS total_students FROM students;` &rarr; 8
- **D2:** `SELECT AVG(marks), MIN(marks), MAX(marks) FROM enrollments;`
- **D3:** `SELECT city, COUNT(*) FROM students GROUP BY city;`
- **D4:** `SELECT course_id, AVG(marks) FROM enrollments GROUP BY course_id;`
- **D5:** `SELECT city, COUNT(*) FROM students GROUP BY city HAVING COUNT(*) > 1;` &rarr; Roorkee (4), Dehradun (2).
- **D6:** `SELECT d.dept_name, SUM(c.credits) FROM departments d JOIN courses c ON d.dept_id = c.dept_id GROUP BY d.dept_name;`
- **D7:** `SELECT name, UPPER(name), LENGTH(name) FROM students;`
- **D8: WHERE vs HAVING:** `WHERE` filters rows *before* grouping and cannot evaluate aggregate functions. `HAVING` filters groups *after* `GROUP BY` aggregation.

---

### Part E: Joins
- **E1 (INNER JOIN):** `SELECT s.name, d.dept_name FROM students s INNER JOIN departments d ON s.dept_id = d.dept_id;`
- **E2 (LEFT JOIN):** `SELECT s.name, d.dept_name FROM students s LEFT JOIN departments d ON s.dept_id = d.dept_id;` (Vikram shows `NULL` for department).
- **E3 (RIGHT/LEFT JOIN):** `SELECT d.dept_name, s.name FROM departments d LEFT JOIN students s ON d.dept_id = s.dept_id;` (Civil shows `NULL` for student).
- **E4 (3-Table JOIN):** `SELECT s.name, c.title, e.marks FROM students s JOIN enrollments e ON s.student_id = e.student_id JOIN courses c ON e.course_id = c.course_id;`
- **E5:** `SELECT s.name FROM students s JOIN enrollments e ON s.student_id = e.student_id JOIN courses c ON e.course_id = c.course_id WHERE c.title = 'Data Structures';`
- **E6:** `SELECT s.name FROM students s LEFT JOIN enrollments e ON s.student_id = e.student_id WHERE e.course_id IS NULL;` &rarr; Vikram
- **E7:** `SELECT c.title, COUNT(e.student_id) FROM courses c LEFT JOIN enrollments e ON c.course_id = e.course_id GROUP BY c.course_id, c.title;`
- **E8:** `SELECT d.dept_name, COUNT(s.student_id), AVG(s.age) FROM departments d LEFT JOIN students s ON d.dept_id = s.dept_id GROUP BY d.dept_name;`

---

### Part F: Subqueries
- **F1:** `SELECT * FROM students WHERE age > (SELECT AVG(age) FROM students);`
- **F2:** `SELECT s.name, e.marks FROM students s JOIN enrollments e ON s.student_id = e.student_id WHERE e.marks = (SELECT MAX(marks) FROM enrollments);` &rarr; Meera (95)
- **F3:** `SELECT * FROM courses WHERE course_id IN (SELECT DISTINCT course_id FROM enrollments);`
- **F4:** `SELECT s.name, COUNT(e.course_id) FROM students s JOIN enrollments e ON s.student_id = e.student_id GROUP BY s.student_id, s.name HAVING COUNT(e.course_id) > 2;` &rarr; Aarav (3)
- **F5:** `SELECT dept_name FROM departments WHERE dept_id = (SELECT dept_id FROM students WHERE dept_id IS NOT NULL GROUP BY dept_id ORDER BY COUNT(*) DESC LIMIT 1);` &rarr; CSE (3 students)
- **F6 (Correlated Subquery):** `SELECT s.name, e.course_id, e.marks FROM students s JOIN enrollments e ON s.student_id = e.student_id WHERE e.marks > (SELECT AVG(e2.marks) FROM enrollments e2 WHERE e2.course_id = e.course_id);`

---

### Part G: Indexes, Views and Transactions
- **G1:** `CREATE INDEX idx_students_city ON students(city);` & `EXPLAIN SELECT * FROM students WHERE city = 'Roorkee';`
- **G2:** `CREATE VIEW student_marks AS SELECT s.name AS student_name, c.title AS course_title, e.marks FROM students s JOIN enrollments e ON s.student_id = e.student_id JOIN courses c ON e.course_id = c.course_id;`
- **G3:** `SELECT * FROM student_marks WHERE marks > 80;`
- **G4:** `DROP VIEW student_marks;` & `DROP INDEX idx_students_city;`
- **G5 (ROLLBACK):** `START TRANSACTION; UPDATE enrollments SET marks = 100 WHERE student_id = 101 AND course_id = 201; ROLLBACK;` (Value reverts to 88).
- **G6 (COMMIT):** `START TRANSACTION; UPDATE enrollments SET marks = 99 WHERE student_id = 101 AND course_id = 201; COMMIT;` (Value permanently 99).

---

### Part H: Challenge Problems
- **H1 (DENSE_RANK):**
  ```sql
  SELECT s.student_id, s.name, SUM(e.marks) AS total_marks,
         DENSE_RANK() OVER (ORDER BY SUM(e.marks) DESC) AS student_rank
  FROM students s JOIN enrollments e ON s.student_id = e.student_id
  GROUP BY s.student_id, s.name ORDER BY student_rank;
  ```
- **H2 (CASE Statement Grading):**
  ```sql
  SELECT s.name, c.title, e.marks,
         CASE 
           WHEN e.marks >= 90 THEN 'A'
           WHEN e.marks >= 75 THEN 'B'
           WHEN e.marks >= 60 THEN 'C'
           ELSE 'D'
         END AS grade
  FROM students s JOIN enrollments e ON s.student_id = e.student_id JOIN courses c ON e.course_id = c.course_id;
  ```
- **H3 (Self Join Pairs):**
  ```sql
  SELECT s1.name AS student_1, s2.name AS student_2, s1.city
  FROM students s1 JOIN students s2 ON s1.city = s2.city AND s1.student_id < s2.student_id;
  ```
- **H4 (Second Highest Marks without LIMIT):**
  ```sql
  SELECT MAX(marks) AS second_highest_marks
  FROM enrollments
  WHERE marks < (SELECT MAX(marks) FROM enrollments);
  -- Returns 91
  ```

---

## ⚡ How to Run All Queries
You can run all exercises live in your terminal using the built-in SQLite engine:
```powershell
cd "d:\Full Stack\Labsheet07"
node run-sql.js
```
No external MySQL installation required — full schema and query results will be output in formatted ASCII tables!
