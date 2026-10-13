-- =============================================================================
-- COER UNIVERSITY, ROORKEE - Department of Computer Science & Engineering
-- Full Stack Web Development - Lab Sheet 7: Database Management Solutions
-- File: solutions.sql
-- =============================================================================

USE college_db;

-- =============================================================================
-- PART A: DDL (Data Definition Language)
-- =============================================================================

-- A1: Create a table faculty with columns: faculty_id (PK), name (NOT NULL),
-- email (UNIQUE), salary, and dept_id (FK to departments).
CREATE TABLE faculty (
    faculty_id INT PRIMARY KEY,
    name       VARCHAR(50) NOT NULL,
    email      VARCHAR(100) UNIQUE,
    salary     DECIMAL(10, 2),
    dept_id    INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

-- A2: Add a new column phone (VARCHAR(15)) to faculty using ALTER TABLE.
ALTER TABLE faculty 
ADD COLUMN phone VARCHAR(15);

-- A3: Rename the column phone to contact_no.
-- MySQL 8.0+ / PostgreSQL standard:
ALTER TABLE faculty 
RENAME COLUMN phone TO contact_no;
-- (Legacy MySQL syntax alternative: ALTER TABLE faculty CHANGE phone contact_no VARCHAR(15);)

-- A4: Drop the column contact_no.
ALTER TABLE faculty 
DROP COLUMN contact_no;

-- A5: Remove the faculty table completely.
DROP TABLE IF EXISTS faculty;

/*
  [EXPLANATION: Difference between DROP, TRUNCATE and DELETE]
  -----------------------------------------------------------------------------
  1. DROP (DDL):
     - Removes the table definition and all its data and indexes completely from the database.
     - The table ceases to exist in the database catalog. Cannot be rolled back in most DBs.
  2. TRUNCATE (DDL):
     - Fast reset: Deletes ALL rows from a table by deallocating pages, but preserves 
       the table structure, columns, constraints, and indexes. Resets auto-increment counter.
  3. DELETE (DML):
     - Row-by-row operation: Removes specific rows matching a WHERE clause (or all rows 
       if WHERE is omitted). Can be rolled back inside transactions. Fires DELETE triggers.
  -----------------------------------------------------------------------------
*/


-- =============================================================================
-- PART B: DML (Data Manipulation Language)
-- =============================================================================

-- B1: Insert a new student: (109, 'Neha', 20, 'Roorkee', 1).
INSERT INTO students (student_id, name, age, city, dept_id) 
VALUES (109, 'Neha', 20, 'Roorkee', 1);

-- B2: Insert a student without specifying city and observe the value stored.
INSERT INTO students (student_id, name, age, dept_id) 
VALUES (110, 'Karan', 21, 2);
-- Observation: Since no default was specified and city allows NULL, the value stored is NULL.

-- B3: Update the city of student 105 to 'Roorkee'.
UPDATE students 
SET city = 'Roorkee' 
WHERE student_id = 105;

-- B4: Increase marks by 5 for all enrollments in course 203.
UPDATE enrollments 
SET marks = marks + 5 
WHERE course_id = 203;

-- B5: Delete the student with student_id = 109 (and test student 110).
DELETE FROM students 
WHERE student_id IN (109, 110);

-- B6: Try inserting a student with age 15. Record error message and explanation.
-- The following query will fail:
-- INSERT INTO students (student_id, name, age, city, dept_id) VALUES (111, 'Ananya', 15, 'Delhi', 1);
/*
  [ERROR RECORD & EXPLANATION FOR B6]
  Error: Check constraint 'students_chk_1' is violated. (Error 3819 / SQLSTATE HY000)
  Explanation: The table schema defines a CHECK constraint on the age column:
               `age INT CHECK (age >= 17)`
               Since 15 < 17, the relational engine rejects the insert to maintain integrity.
*/


-- =============================================================================
-- PART C: Querying with SELECT
-- =============================================================================

-- C1: Display all columns of all students.
SELECT * FROM students;

-- C2: Display only the name and city of all students.
SELECT name, city FROM students;

-- C3: List students from Roorkee.
SELECT * FROM students 
WHERE city = 'Roorkee';

-- C4: List students aged between 20 and 22 (use BETWEEN).
SELECT * FROM students 
WHERE age BETWEEN 20 AND 22;

-- C5: List students from Roorkee or Dehradun (use IN).
SELECT * FROM students 
WHERE city IN ('Roorkee', 'Dehradun');

-- C6: List students whose name starts with 'A' (use LIKE).
SELECT * FROM students 
WHERE name LIKE 'A%';

-- C7: List students who have no department assigned (use IS NULL).
SELECT * FROM students 
WHERE dept_id IS NULL;

-- C8: Display distinct cities of all students.
SELECT DISTINCT city 
FROM students 
WHERE city IS NOT NULL;

-- C9: Display students sorted by age in descending order, then by name ascending.
SELECT * FROM students 
ORDER BY age DESC, name ASC;

-- C10: Display the top 3 oldest students (LIMIT).
SELECT * FROM students 
ORDER BY age DESC 
LIMIT 3;

-- C11: Display name as "Student Name" and age as "Age" using aliases.
SELECT name AS "Student Name", age AS "Age" 
FROM students;


-- =============================================================================
-- PART D: Functions and Aggregation
-- =============================================================================

-- D1: Find the total number of students.
SELECT COUNT(*) AS total_students 
FROM students;

-- D2: Find the average, minimum and maximum marks in the enrollments table.
SELECT 
    AVG(marks) AS average_marks,
    MIN(marks) AS minimum_marks,
    MAX(marks) AS maximum_marks
FROM enrollments;

-- D3: Count the number of students in each city.
SELECT city, COUNT(*) AS student_count 
FROM students 
WHERE city IS NOT NULL 
GROUP BY city;

-- D4: Find the average marks for each course.
SELECT course_id, AVG(marks) AS average_marks 
FROM enrollments 
GROUP BY course_id;

-- D5: Show only those cities that have more than one student (HAVING).
SELECT city, COUNT(*) AS student_count 
FROM students 
WHERE city IS NOT NULL 
GROUP BY city 
HAVING COUNT(*) > 1;

-- D6: Find the total credits offered by each department.
SELECT d.dept_name, SUM(c.credits) AS total_credits 
FROM departments d 
JOIN courses c ON d.dept_id = c.dept_id 
GROUP BY d.dept_name;

-- D7: Display student names in uppercase and the length of each name (UPPER, LENGTH).
SELECT name, UPPER(name) AS upper_name, LENGTH(name) AS name_length 
FROM students;

-- D8: Explanation: Why WHERE cannot be used with aggregate functions, and what HAVING does differently.
/*
  [EXPLANATION FOR D8]
  In SQL query execution order:
    1. FROM & JOIN
    2. WHERE (Row-level filtering BEFORE grouping)
    3. GROUP BY (Grouping rows into buckets)
    4. HAVING (Group-level filtering AFTER aggregation)
    5. SELECT (Computing projection & aggregate functions)
    6. ORDER BY
  WHERE filters individual records BEFORE aggregation occurs; therefore, the aggregated 
  value does not exist yet at the WHERE stage.
  HAVING was created specifically to filter groups AFTER aggregate calculations (SUM, AVG, COUNT).
*/


-- =============================================================================
-- PART E: Joins
-- =============================================================================

-- E1: Display each student's name along with their department name (INNER JOIN).
SELECT s.name AS student_name, d.dept_name 
FROM students s 
INNER JOIN departments d ON s.dept_id = d.dept_id;

-- E2: Display all students, including those without a department (LEFT JOIN).
-- Vikram (student_id 107) has dept_id = NULL and shows NULL for dept_name.
SELECT s.name AS student_name, d.dept_name 
FROM students s 
LEFT JOIN departments d ON s.dept_id = d.dept_id;

-- E3: Display all departments, including those with no students (Civil shows NULL).
SELECT d.dept_name, s.name AS student_name 
FROM departments d 
LEFT JOIN students s ON d.dept_id = s.dept_id;

-- E4: Display student name, course title and marks by joining students, enrollments and courses.
SELECT s.name AS student_name, c.title AS course_title, e.marks 
FROM students s 
JOIN enrollments e ON s.student_id = e.student_id 
JOIN courses c ON e.course_id = c.course_id;

-- E5: List the names of students enrolled in 'Data Structures'.
SELECT s.name 
FROM students s 
JOIN enrollments e ON s.student_id = e.student_id 
JOIN courses c ON e.course_id = c.course_id 
WHERE c.title = 'Data Structures';

-- E6: Find students who are not enrolled in any course (LEFT JOIN with IS NULL).
SELECT s.student_id, s.name, s.city 
FROM students s 
LEFT JOIN enrollments e ON s.student_id = e.student_id 
WHERE e.course_id IS NULL;

-- E7: Display the number of students enrolled in each course (include courses with zero enrollments).
SELECT c.course_id, c.title, COUNT(e.student_id) AS enrolled_students 
FROM courses c 
LEFT JOIN enrollments e ON c.course_id = e.course_id 
GROUP BY c.course_id, c.title;

-- E8: Display each department with its number of students and its average age.
SELECT d.dept_name, COUNT(s.student_id) AS total_students, AVG(s.age) AS avg_age 
FROM departments d 
LEFT JOIN students s ON d.dept_id = s.dept_id 
GROUP BY d.dept_name;


-- =============================================================================
-- PART F: Subqueries
-- =============================================================================

-- F1: Find students whose age is greater than the average age.
SELECT * FROM students 
WHERE age > (SELECT AVG(age) FROM students);

-- F2: Find the student(s) with the highest marks in any course.
SELECT s.name, e.course_id, e.marks 
FROM students s 
JOIN enrollments e ON s.student_id = e.student_id 
WHERE e.marks = (SELECT MAX(marks) FROM enrollments);

-- F3: List courses that have at least one enrollment (IN or EXISTS).
SELECT * FROM courses 
WHERE course_id IN (SELECT DISTINCT course_id FROM enrollments);

-- F4: List students enrolled in more than 2 courses.
SELECT s.student_id, s.name, COUNT(e.course_id) AS courses_enrolled 
FROM students s 
JOIN enrollments e ON s.student_id = e.student_id 
GROUP BY s.student_id, s.name 
HAVING COUNT(e.course_id) > 2;

-- F5: Find the department with the highest number of students.
SELECT dept_name 
FROM departments 
WHERE dept_id = (
    SELECT dept_id 
    FROM students 
    WHERE dept_id IS NOT NULL 
    GROUP BY dept_id 
    ORDER BY COUNT(*) DESC 
    LIMIT 1
);

-- F6: For each course, list students who scored above that course's average (correlated subquery).
SELECT s.name AS student_name, e.course_id, e.marks 
FROM students s 
JOIN enrollments e ON s.student_id = e.student_id 
WHERE e.marks > (
    SELECT AVG(e2.marks) 
    FROM enrollments e2 
    WHERE e2.course_id = e.course_id
);


-- =============================================================================
-- PART G: Indexes, Views and Transactions
-- =============================================================================

-- G1: Create an index on students(city). Run EXPLAIN and note changes.
CREATE INDEX idx_students_city ON students(city);
EXPLAIN SELECT * FROM students WHERE city = 'Roorkee';

-- G2: Create a view student_marks that shows student name, course title and marks.
CREATE OR REPLACE VIEW student_marks AS 
SELECT s.name AS student_name, c.title AS course_title, e.marks 
FROM students s 
JOIN enrollments e ON s.student_id = e.student_id 
JOIN courses c ON e.course_id = c.course_id;

-- G3: Query the view to list students scoring above 80.
SELECT * FROM student_marks 
WHERE marks > 80;

-- G4: Drop the view and the index.
DROP VIEW IF EXISTS student_marks;
DROP INDEX idx_students_city ON students;

-- G5: Transaction with ROLLBACK. Check value is unchanged.
START TRANSACTION;
UPDATE enrollments SET marks = 100 WHERE student_id = 101 AND course_id = 201;
SELECT marks FROM enrollments WHERE student_id = 101 AND course_id = 201; -- shows 100 in transaction
ROLLBACK;
SELECT marks FROM enrollments WHERE student_id = 101 AND course_id = 201; -- rolled back to original value (88)

-- G6: Transaction with COMMIT. Confirm change is permanent.
START TRANSACTION;
UPDATE enrollments SET marks = 99 WHERE student_id = 101 AND course_id = 201;
COMMIT;
SELECT marks FROM enrollments WHERE student_id = 101 AND course_id = 201; -- permanently 99


-- =============================================================================
-- PART H: Challenge Problems (Optional)
-- =============================================================================

-- H1: Rank list of students by their total marks, with ties handled using RANK() or DENSE_RANK().
SELECT 
    s.student_id,
    s.name,
    SUM(e.marks) AS total_marks,
    DENSE_RANK() OVER (ORDER BY SUM(e.marks) DESC) AS student_rank
FROM students s 
JOIN enrollments e ON s.student_id = e.student_id 
GROUP BY s.student_id, s.name 
ORDER BY student_rank;

-- H2: Assign a grade to each enrollment using CASE:
-- 90 and above = A, 75 to 89 = B, 60 to 74 = C, below 60 = D.
SELECT 
    s.name AS student_name,
    c.title AS course_title,
    e.marks,
    CASE 
        WHEN e.marks >= 90 THEN 'A'
        WHEN e.marks >= 75 THEN 'B'
        WHEN e.marks >= 60 THEN 'C'
        ELSE 'D'
    END AS grade
FROM students s 
JOIN enrollments e ON s.student_id = e.student_id 
JOIN courses c ON e.course_id = c.course_id 
ORDER BY e.marks DESC;

-- H3: Find pairs of students from the same city (self join).
SELECT 
    s1.name AS student_1,
    s2.name AS student_2,
    s1.city 
FROM students s1 
JOIN students s2 ON s1.city = s2.city AND s1.student_id < s2.student_id;

-- H4: Find the second highest marks in the enrollments table without using LIMIT.
SELECT MAX(marks) AS second_highest_marks 
FROM enrollments 
WHERE marks < (SELECT MAX(marks) FROM enrollments);
