/**
 * COER UNIVERSITY, ROORKEE
 * Department of Computer Science & Engineering
 * Full Stack Web Development — Class Test
 * 
 * Q2: calc.js
 * Exports add(a, b) and subtract(a, b) using module.exports.
 */

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// Exporting both functions as an object using CommonJS module.exports
module.exports = {
  add,
  subtract
};
