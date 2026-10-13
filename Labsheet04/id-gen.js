/**
 * Task 10: npm and an External Package
 * File: id-gen.js
 * Operations:
 * Uses the external 'nanoid' package (v3) to generate 5 unique IDs.
 * Run: node id-gen.js
 */

const { nanoid } = require('nanoid');

console.log('==============================================');
console.log('Task 10: Unique ID Generation with nanoid');
console.log('==============================================\n');

console.log('Generating 5 unique IDs using nanoid:\n');

for (let i = 1; i <= 5; i++) {
  const uniqueId = nanoid();
  console.log(`  ID #${i}:  ${uniqueId}  (Length: ${uniqueId.length} characters)`);
}

console.log('\nTask 10 completed successfully.');
