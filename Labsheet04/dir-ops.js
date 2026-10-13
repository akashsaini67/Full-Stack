/**
 * Task 3: Directory Operations
 * File: dir-ops.js
 * Operations:
 * 1. Creates a directory named 'uploads'.
 * 2. Creates 3 empty files inside it: file1.txt, file2.txt, file3.txt.
 * 3. Lists all files in the 'uploads' folder.
 * 4. Deletes one of the files (file2.txt).
 * Use: fs.mkdir, fs.writeFile, fs.readdir, fs.unlink
 * Run: node dir-ops.js
 */

const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads');
const file1 = path.join(uploadDir, 'file1.txt');
const file2 = path.join(uploadDir, 'file2.txt');
const file3 = path.join(uploadDir, 'file3.txt');

console.log('==============================================');
console.log('Task 3: Directory Operations in Node.js');
console.log('==============================================\n');

// Step 1: Create directory
fs.mkdir(uploadDir, { recursive: true }, (err) => {
  if (err) {
    console.error('Error creating directory:', err);
    return;
  }
  console.log('[Step 1] Created directory: "uploads"');

  // Step 2: Create 3 empty files inside uploads
  fs.writeFile(file1, '', (err) => {
    if (err) throw err;
    fs.writeFile(file2, '', (err) => {
      if (err) throw err;
      fs.writeFile(file3, '', (err) => {
        if (err) throw err;
        console.log('[Step 2] Created 3 empty files: file1.txt, file2.txt, file3.txt');

        // Step 3: List all files in uploads
        fs.readdir(uploadDir, (err, files) => {
          if (err) throw err;
          console.log('\n[Step 3] Files currently in "uploads" folder:');
          files.forEach((file, index) => {
            console.log(`   ${index + 1}. ${file}`);
          });

          // Step 4: Delete file2.txt
          console.log('\n[Step 4] Deleting "file2.txt"...');
          fs.unlink(file2, (err) => {
            if (err) throw err;
            console.log('Successfully deleted "file2.txt"');

            // Verify remaining files
            fs.readdir(uploadDir, (err, remaining) => {
              if (err) throw err;
              console.log('Remaining files in "uploads" folder:', remaining);
              console.log('\nTask 3 completed successfully.');
            });
          });
        });
      });
    });
  });
});
