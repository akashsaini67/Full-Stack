/**
 * Master Verification & Test Script for Lab Sheet 4
 * File: test-all.js
 * Runs automated tests across all 12 Node.js tasks.
 * Run: node test-all.js
 */

const { execSync } = require('child_process');
const http = require('http');

console.log('================================================================');
console.log(' COER UNIVERSITY - LAB SHEET 4 AUTOMATED TEST SUITE');
console.log('================================================================\n');

function run(cmd, label) {
  console.log(`\n>>> [${label}] Running: ${cmd}`);
  try {
    const output = execSync(cmd, { encoding: 'utf8', cwd: __dirname });
    console.log(output.trim());
  } catch (err) {
    console.error(`Error executing ${cmd}:`, err.message);
  }
}

// Run non-daemon tasks
run('node app1.js', 'Task 1: Custom Modules');
run('node file-ops.js', 'Task 2: File System Operations');
run('node dir-ops.js', 'Task 3: Directory Operations');
run('node path-demo.js', 'Task 4: Path Module');
run('node sys-report.js', 'Task 5: OS Diagnostics');
run('node order-events.js', 'Task 6: EventEmitter');
run('node stream-demo.js', 'Task 9: Streams & Buffers');
run('node id-gen.js', 'Task 10: Nanoid NPM Package');
run('node calc-cli.js 15 3 +', 'Task 11: CLI Addition');
run('node calc-cli.js 45 5 /', 'Task 11: CLI Division');

console.log('\n================================================================');
console.log(' HTTP Servers (Task 7, 8, 12) instructions:');
console.log(' - Task 7 & 8: node server.js (Routes: /, /students, /students/1, /search?keyword=node)');
console.log(' - Task 12:    $env:PORT=5000; node env-demo.js');
console.log('================================================================');
