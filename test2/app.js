/**
 * COER UNIVERSITY, ROORKEE
 * Department of Computer Science & Engineering
 * Full Stack Web Development — Class Test
 * 
 * Q2: app.js
 * Imports both functions from calc.js using require()
 * and logs the result of add(4, 5).
 */

// Import both functions from calc.js
const { add, subtract } = require('./calc');

// Log the result of add(4, 5)
const result = add(4, 5);
console.log('Result of add(4, 5):', result);

// Optional: also verifying subtract
console.log('Result of subtract(10, 4):', subtract(10, 4));
