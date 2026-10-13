/**
 * Task 4: Path Module
 * File: path-demo.js
 * Operations:
 * Takes a hardcoded file path and demonstrates:
 * - path.dirname
 * - path.basename
 * - path.extname
 * - path.resolve (resolving relative path to absolute)
 * Run: node path-demo.js
 */

const path = require('path');

console.log('==============================================');
console.log('Task 4: Node.js Path Module Demonstration');
console.log('==============================================\n');

// Sample hardcoded file path
const samplePath = '/home/user/data/report.pdf';
console.log(`Original Path: "${samplePath}"\n`);

// 1. Directory Name
const dirName = path.dirname(samplePath);
console.log(`1. Directory Name (path.dirname):  ${dirName}`);

// 2. Base Name
const baseName = path.basename(samplePath);
console.log(`2. Base Name (path.basename):       ${baseName}`);

// 2b. Base Name without extension
const baseWithoutExt = path.basename(samplePath, path.extname(samplePath));
console.log(`   Base Name without Extension:     ${baseWithoutExt}`);

// 3. Extension
const extension = path.extname(samplePath);
console.log(`3. Extension (path.extname):        ${extension}`);

// 4. Absolute Path Resolved from Relative Path
const relativePath = './data/monthly-report.pdf';
const resolvedPath = path.resolve(relativePath);
console.log(`\n4. Relative Path:                   ${relativePath}`);
console.log(`   Resolved Absolute Path:          ${resolvedPath}`);

console.log('\nTask 4 completed successfully.');
