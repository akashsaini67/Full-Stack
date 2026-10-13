/**
 * Task 2: File System — CRUD on a Text File
 * File: file-ops.js
 * Operations:
 * 1. Creates 'student.txt' and writes Name and Roll Number.
 * 2. Appends Course Name to it.
 * 3. Reads and prints the full content.
 * 4. Renames the file to 'profile.txt'.
 * Use: fs.writeFile, fs.appendFile, fs.readFile, fs.rename
 * Run: node file-ops.js
 */

const fs = require('fs');
const path = require('path');

const studentFile = path.join(__dirname, 'student.txt');
const profileFile = path.join(__dirname, 'profile.txt');

console.log('==============================================');
console.log('Task 2: File System CRUD Operations');
console.log('==============================================\n');

// Initial content
const initialData = 'Name: Akash Saini\nRoll Number: 22001015001\n';
const appendedData = 'Course: Full Stack Web Development (CSE)\nUniversity: COER University, Roorkee\n';

// Step 1: Write file (student.txt)
fs.writeFile(studentFile, initialData, 'utf8', (err) => {
  if (err) {
    console.error('Error writing student.txt:', err);
    return;
  }
  console.log('[Step 1] Created "student.txt" and wrote student details.');

  // Step 2: Append file
  fs.appendFile(studentFile, appendedData, 'utf8', (err) => {
    if (err) {
      console.error('Error appending to student.txt:', err);
      return;
    }
    console.log('[Step 2] Appended course and university info to "student.txt".');

    // Step 3: Read and print file content
    fs.readFile(studentFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading student.txt:', err);
        return;
      }
      console.log('\n[Step 3] Successfully read file content:\n--- FILE CONTENT START ---');
      console.log(data.trim());
      console.log('--- FILE CONTENT END ---\n');

      // Step 4: Rename to profile.txt
      fs.rename(studentFile, profileFile, (err) => {
        if (err) {
          console.error('Error renaming file:', err);
          return;
        }
        console.log('[Step 4] File successfully renamed from "student.txt" to "profile.txt"!');
        console.log('\nTask 2 completed successfully.');
      });
    });
  });
});
