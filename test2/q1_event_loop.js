/**
 * COER UNIVERSITY, ROORKEE
 * Department of Computer Science & Engineering
 * Full Stack Web Development — Class Test
 * 
 * Q1. Node.js — The Event Loop
 * 
 * Predict the exact console output order for the code below, and justify your answer
 * in 2–3 lines by explaining how Node.js schedules synchronous code, timers, and promises.
 */

console.log('--- Executing Q1 Code Snippet ---');

console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));

console.log('D');

/**
 * ========================================================
 * PREDICTED OUTPUT:
 * ========================================================
 * A
 * D
 * C
 * B
 * 
 * ========================================================
 * 2–3 LINE JUSTIFICATION:
 * ========================================================
 * 1. Synchronous code on the Call Stack runs first to completion, printing 'A' and 'D'.
 * 2. Next, the microtask queue (Promise.then callbacks) is given priority and drains
 *    completely before any event loop phase transitions, printing 'C'.
 * 3. Finally, the event loop enters the Timers phase to execute macrotasks like
 *    setTimeout callbacks, printing 'B'.
 */
