/**
 * Task 1: Custom Modules - Main Consumer Script
 * File: app1.js
 * Imports sum.js and even-odd.js and calls them with sample values.
 * Run: node app1.js
 */

const { add } = require('./sum');
const { checkEvenOdd } = require('./even-odd');

console.log('==============================================');
console.log('Task 1: Testing Custom Modules in Node.js');
console.log('==============================================\n');

// Sample test values
const num1 = 18;
const num2 = 24;

const sumResult = add(num1, num2);
console.log(`[Sum Module]       ${num1} + ${num2} = ${sumResult}`);

console.log(`[Even-Odd Module]  ${num1} is ${checkEvenOdd(num1)}`);
console.log(`[Even-Odd Module]  ${num2} is ${checkEvenOdd(num2)}`);
console.log(`[Even-Odd Module]  7 is ${checkEvenOdd(7)}`);
console.log(`[Even-Odd Module]  15 is ${checkEvenOdd(15)}`);
console.log('\nTask 1 execution completed successfully!');
