/**
 * Task 1: Custom Modules - Even/Odd Checker Module
 * File: even-odd.js
 * Exports a function that checks if a number is Even or Odd
 */

function checkEvenOdd(num) {
  if (typeof num !== 'number') {
    return 'Invalid input: Not a number';
  }
  return num % 2 === 0 ? 'Even' : 'Odd';
}

module.exports = { checkEvenOdd };
