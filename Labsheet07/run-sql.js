/**
 * ==============================================================================
 * Lab Sheet 7: Database Management Interactive SQL Execution Engine
 * File: run-sql.js
 * Uses Node.js 24's built-in 'node:sqlite' engine to execute all queries in memory
 * and display neat, formatted tabular outputs directly in the terminal!
 * Run: node run-sql.js
 * ==============================================================================
 */

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync(':memory:');

console.log('====================================================================');
console.log(' COER UNIVERSITY - LAB SHEET 7: SQL DATABASE EXECUTION ENGINE');
console.log('====================================================================\n');

// 1. Initialize Tables & Seed Data
db.exec(`
  CREATE TABLE departments (
      dept_id   INTEGER PRIMARY KEY,
      dept_name TEXT NOT NULL UNIQUE
  );

  CREATE TABLE students (
      student_id INTEGER PRIMARY KEY,
      name       TEXT NOT NULL,
      age        INTEGER CHECK (age >= 17),
      city       TEXT,
      dept_id    INTEGER,
      FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
  );

  CREATE TABLE courses (
      course_id INTEGER PRIMARY KEY,
      title     TEXT NOT NULL,
      credits   INTEGER DEFAULT 3,
      dept_id   INTEGER,
      FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
  );

  CREATE TABLE enrollments (
      student_id INTEGER,
      course_id  INTEGER,
      marks      INTEGER,
      PRIMARY KEY (student_id, course_id),
      FOREIGN KEY (student_id) REFERENCES students(student_id),
      FOREIGN KEY (course_id)  REFERENCES courses(course_id)
  );

  INSERT INTO departments VALUES 
  (1, 'CSE'), (2, 'ECE'), (3, 'Mechanical'), (4, 'Civil');

  INSERT INTO students VALUES
  (101, 'Aarav', 20, 'Roorkee', 1),
  (102, 'Diya', 21, 'Dehradun', 1),
  (103, 'Kabir', 19, 'Haridwar', 2),
  (104, 'Meera', 22, 'Roorkee', 1),
  (105, 'Rohan', 20, 'Delhi', 3),
  (106, 'Sana', 21, 'Dehradun', 2),
  (107, 'Vikram', 23, 'Jaipur', NULL),
  (108, 'Isha', 19, 'Roorkee', 2);

  INSERT INTO courses VALUES
  (201, 'Data Structures', 4, 1),
  (202, 'Operating Systems', 4, 1),
  (203, 'Digital Electronics', 3, 2),
  (204, 'Thermodynamics', 3, 3),
  (205, 'Machine Learning', 4, 1);

  INSERT INTO enrollments VALUES
  (101, 201, 88), (101, 202, 76), (101, 205, 91),
  (102, 201, 67), (102, 205, 72),
  (103, 203, 81),
  (104, 201, 95), (104, 202, 89),
  (105, 204, 58),
  (106, 203, 74),
  (108, 203, 66);
`);

console.log('✅ college_db initialized with 4 departments, 8 students, 5 courses, 11 enrollments.\n');

function runQuery(label, sql) {
  console.log(`--------------------------------------------------------------------`);
  console.log(`[${label}]`);
  console.log(`SQL: ${sql.trim().replace(/\s+/g, ' ')}`);
  try {
    const stmt = db.prepare(sql);
    const rows = stmt.all();
    console.table(rows);
  } catch (err) {
    console.log(`Result: ${err.message}`);
  }
}

// Check initial data
runQuery('Check: Confirm 8 rows in students', 'SELECT * FROM students');

// PART A: DDL
console.log('\n=================== PART A: DDL (Data Definition Language) ===================');
db.exec(`
  CREATE TABLE faculty (
    faculty_id INTEGER PRIMARY KEY,
    name       TEXT NOT NULL,
    email      TEXT UNIQUE,
    salary     REAL,
    dept_id    INTEGER,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
  );
`);
console.log('[A1] Created table faculty successfully.');

db.exec(`ALTER TABLE faculty ADD COLUMN phone TEXT;`);
console.log('[A2] Added column phone using ALTER TABLE.');

db.exec(`ALTER TABLE faculty RENAME COLUMN phone TO contact_no;`);
console.log('[A3] Renamed column phone to contact_no.');

db.exec(`ALTER TABLE faculty DROP COLUMN contact_no;`);
console.log('[A4] Dropped column contact_no.');

db.exec(`DROP TABLE faculty;`);
console.log('[A5] Dropped table faculty completely.');

// PART B: DML
console.log('\n=================== PART B: DML (Data Manipulation Language) ===================');
db.exec(`INSERT INTO students (student_id, name, age, city, dept_id) VALUES (109, 'Neha', 20, 'Roorkee', 1);`);
console.log('[B1] Inserted student (109, Neha, 20, Roorkee, 1).');

db.exec(`INSERT INTO students (student_id, name, age, dept_id) VALUES (110, 'Karan', 21, 2);`);
runQuery('B2: Inserted without city -> Observe NULL', 'SELECT * FROM students WHERE student_id = 110');

db.exec(`UPDATE students SET city = 'Roorkee' WHERE student_id = 105;`);
runQuery('B3: Updated city of student 105 to Roorkee', 'SELECT * FROM students WHERE student_id = 105');

db.exec(`UPDATE enrollments SET marks = marks + 5 WHERE course_id = 203;`);
runQuery('B4: Increased marks by 5 for course 203', 'SELECT * FROM enrollments WHERE course_id = 203');

db.exec(`DELETE FROM students WHERE student_id IN (109, 110);`);
console.log('[B5] Deleted student 109 and test student 110.');

try {
  db.exec(`INSERT INTO students VALUES (111, 'Ananya', 15, 'Delhi', 1);`);
} catch (err) {
  console.log(`[B6] Expected Check Constraint Error: "${err.message}" (Age 15 violates CHECK (age >= 17))`);
}

// PART C: SELECT Queries
console.log('\n=================== PART C: Querying with SELECT ===================');
runQuery('C1: All columns of all students', 'SELECT * FROM students');
runQuery('C2: Name and city of all students', 'SELECT name, city FROM students');
runQuery('C3: Students from Roorkee', "SELECT * FROM students WHERE city = 'Roorkee'");
runQuery('C4: Students aged between 20 and 22', 'SELECT * FROM students WHERE age BETWEEN 20 AND 22');
runQuery('C5: Students from Roorkee or Dehradun', "SELECT * FROM students WHERE city IN ('Roorkee', 'Dehradun')");
runQuery('C6: Students whose name starts with A', "SELECT * FROM students WHERE name LIKE 'A%'");
runQuery('C7: Students with no department (IS NULL)', 'SELECT * FROM students WHERE dept_id IS NULL');
runQuery('C8: Distinct cities', 'SELECT DISTINCT city FROM students WHERE city IS NOT NULL');
runQuery('C9: Sorted by age DESC, then name ASC', 'SELECT * FROM students ORDER BY age DESC, name ASC');
runQuery('C10: Top 3 oldest students', 'SELECT * FROM students ORDER BY age DESC LIMIT 3');
runQuery('C11: Aliases Student Name and Age', 'SELECT name AS "Student Name", age AS "Age" FROM students');

// PART D: Aggregations
console.log('\n=================== PART D: Functions and Aggregation ===================');
runQuery('D1: Total number of students', 'SELECT COUNT(*) AS total_students FROM students');
runQuery('D2: Avg, Min, Max marks in enrollments', 'SELECT ROUND(AVG(marks), 2) AS avg_marks, MIN(marks) AS min_marks, MAX(marks) AS max_marks FROM enrollments');
runQuery('D3: Student count in each city', 'SELECT city, COUNT(*) AS student_count FROM students WHERE city IS NOT NULL GROUP BY city');
runQuery('D4: Average marks for each course', 'SELECT course_id, ROUND(AVG(marks), 2) AS avg_marks FROM enrollments GROUP BY course_id');
runQuery('D5: Cities with more than one student (HAVING)', 'SELECT city, COUNT(*) AS student_count FROM students WHERE city IS NOT NULL GROUP BY city HAVING COUNT(*) > 1');
runQuery('D6: Total credits offered by each department', 'SELECT d.dept_name, SUM(c.credits) AS total_credits FROM departments d JOIN courses c ON d.dept_id = c.dept_id GROUP BY d.dept_name');
runQuery('D7: Names in uppercase and length', 'SELECT name, UPPER(name) AS upper_name, LENGTH(name) AS name_length FROM students');

// PART E: Joins
console.log('\n=================== PART E: Joins ===================');
runQuery('E1: Student name with department name (INNER JOIN)', `
  SELECT s.name AS student_name, d.dept_name 
  FROM students s 
  INNER JOIN departments d ON s.dept_id = d.dept_id
`);

runQuery('E2: All students including without department (LEFT JOIN - Vikram is NULL)', `
  SELECT s.name AS student_name, d.dept_name 
  FROM students s 
  LEFT JOIN departments d ON s.dept_id = d.dept_id
`);

runQuery('E3: All departments including with no students (Civil has NULL)', `
  SELECT d.dept_name, s.name AS student_name 
  FROM departments d 
  LEFT JOIN students s ON d.dept_id = s.dept_id
`);

runQuery('E4: Student name, course title and marks (3 tables)', `
  SELECT s.name AS student_name, c.title AS course_title, e.marks 
  FROM students s 
  JOIN enrollments e ON s.student_id = e.student_id 
  JOIN courses c ON e.course_id = c.course_id
`);

runQuery('E5: Students enrolled in Data Structures', `
  SELECT s.name AS student_name 
  FROM students s 
  JOIN enrollments e ON s.student_id = e.student_id 
  JOIN courses c ON e.course_id = c.course_id 
  WHERE c.title = 'Data Structures'
`);

runQuery('E6: Students not enrolled in any course (LEFT JOIN IS NULL)', `
  SELECT s.student_id, s.name 
  FROM students s 
  LEFT JOIN enrollments e ON s.student_id = e.student_id 
  WHERE e.course_id IS NULL
`);

runQuery('E7: Students enrolled in each course (including zero enrollments)', `
  SELECT c.course_id, c.title, COUNT(e.student_id) AS enrolled_students 
  FROM courses c 
  LEFT JOIN enrollments e ON c.course_id = e.course_id 
  GROUP BY c.course_id, c.title
`);

runQuery('E8: Each department with student count and average age', `
  SELECT d.dept_name, COUNT(s.student_id) AS total_students, ROUND(AVG(s.age), 1) AS avg_age 
  FROM departments d 
  LEFT JOIN students s ON d.dept_id = s.dept_id 
  GROUP BY d.dept_name
`);

// PART F: Subqueries
console.log('\n=================== PART F: Subqueries ===================');
runQuery('F1: Students older than average age', `
  SELECT * FROM students 
  WHERE age > (SELECT AVG(age) FROM students)
`);

runQuery('F2: Student with highest marks in any course', `
  SELECT s.name, e.course_id, e.marks 
  FROM students s 
  JOIN enrollments e ON s.student_id = e.student_id 
  WHERE e.marks = (SELECT MAX(marks) FROM enrollments)
`);

runQuery('F3: Courses having at least one enrollment (IN)', `
  SELECT * FROM courses 
  WHERE course_id IN (SELECT DISTINCT course_id FROM enrollments)
`);

runQuery('F4: Students enrolled in more than 2 courses', `
  SELECT s.student_id, s.name, COUNT(e.course_id) AS courses_enrolled 
  FROM students s 
  JOIN enrollments e ON s.student_id = e.student_id 
  GROUP BY s.student_id, s.name 
  HAVING COUNT(e.course_id) > 2
`);

runQuery('F5: Department with highest number of students', `
  SELECT dept_name FROM departments 
  WHERE dept_id = (
    SELECT dept_id FROM students 
    WHERE dept_id IS NOT NULL 
    GROUP BY dept_id 
    ORDER BY COUNT(*) DESC LIMIT 1
  )
`);

runQuery('F6: Students scoring above that course average (Correlated subquery)', `
  SELECT s.name AS student_name, e.course_id, e.marks 
  FROM students s 
  JOIN enrollments e ON s.student_id = e.student_id 
  WHERE e.marks > (
    SELECT AVG(e2.marks) FROM enrollments e2 
    WHERE e2.course_id = e.course_id
  )
`);

// PART G: Indexes, Views, Transactions
console.log('\n=================== PART G: Indexes, Views and Transactions ===================');
db.exec(`CREATE INDEX idx_students_city ON students(city);`);
runQuery('G1: EXPLAIN index plan', `EXPLAIN QUERY PLAN SELECT * FROM students WHERE city = 'Roorkee'`);

db.exec(`
  CREATE VIEW student_marks AS 
  SELECT s.name AS student_name, c.title AS course_title, e.marks 
  FROM students s 
  JOIN enrollments e ON s.student_id = e.student_id 
  JOIN courses c ON e.course_id = c.course_id;
`);
runQuery('G3: Query view for marks > 80', `SELECT * FROM student_marks WHERE marks > 80`);

db.exec(`DROP VIEW student_marks;`);
db.exec(`DROP INDEX idx_students_city;`);
console.log('[G4] Dropped view and index.');

// PART H: Challenges
console.log('\n=================== PART H: Challenge Problems ===================');
runQuery('H1: DENSE_RANK by total marks', `
  SELECT s.student_id, s.name, SUM(e.marks) AS total_marks,
         DENSE_RANK() OVER (ORDER BY SUM(e.marks) DESC) AS student_rank 
  FROM students s 
  JOIN enrollments e ON s.student_id = e.student_id 
  GROUP BY s.student_id, s.name 
  ORDER BY student_rank
`);

runQuery('H2: CASE statement grades (A, B, C, D)', `
  SELECT s.name AS student_name, c.title, e.marks,
         CASE 
           WHEN e.marks >= 90 THEN 'A'
           WHEN e.marks >= 75 THEN 'B'
           WHEN e.marks >= 60 THEN 'C'
           ELSE 'D'
         END AS grade 
  FROM students s 
  JOIN enrollments e ON s.student_id = e.student_id 
  JOIN courses c ON e.course_id = c.course_id 
  ORDER BY e.marks DESC LIMIT 8
`);

runQuery('H3: Pairs of students from the same city (Self Join)', `
  SELECT s1.name AS student_1, s2.name AS student_2, s1.city 
  FROM students s1 
  JOIN students s2 ON s1.city = s2.city AND s1.student_id < s2.student_id
`);

runQuery('H4: Second highest marks without LIMIT', `
  SELECT MAX(marks) AS second_highest_marks 
  FROM enrollments 
  WHERE marks < (SELECT MAX(marks) FROM enrollments)
`);

console.log('\n====================================================================');
console.log(' All Lab Sheet 7 SQL Exercises Executed Successfully!');
console.log('====================================================================');
