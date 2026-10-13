/**
 * Task 6: Events Module — Custom EventEmitter
 * File: order-events.js
 * Operations:
 * 1. Creates an EventEmitter instance.
 * 2. Defines a listener for the 'orderPlaced' event.
 * 3. On emit, receives an order object ({ id, item, amount }) and logs a formatted receipt.
 * 4. Emits the event 3 times with different sample orders.
 * Use: require('events').EventEmitter
 * Run: node order-events.js
 */

const { EventEmitter } = require('events');

// Create instance of custom EventEmitter
class OrderManager extends EventEmitter {}
const orderManager = new OrderManager();

console.log('==============================================');
console.log('Task 6: Node.js Custom EventEmitter System');
console.log('==============================================\n');

// Register listener for 'orderPlaced' event
orderManager.on('orderPlaced', (order) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log('----------------------------------------------');
  console.log(`🧾 ORDER RECEIPT [${timestamp}]`);
  console.log(`   Order ID:     #${order.id}`);
  console.log(`   Item Name:    ${order.item}`);
  console.log(`   Amount:       ₹${order.amount.toLocaleString('en-IN')}`);
  console.log(`   Payment:      CONFIRMED & PROCESSED`);
  console.log('----------------------------------------------\n');
});

// Emit the event 3 times with different orders as requested
console.log('Dispatching 3 Order Events:\n');

orderManager.emit('orderPlaced', {
  id: 'ORD-101',
  item: 'Sony WH-1000XM5 Headphones',
  amount: 26990
});

orderManager.emit('orderPlaced', {
  id: 'ORD-102',
  item: 'Apple Watch Series 9',
  amount: 41900
});

orderManager.emit('orderPlaced', {
  id: 'ORD-103',
  item: 'Keychron K2 Mechanical Keyboard',
  amount: 7499
});

console.log('All 3 events handled. Task 6 completed successfully.');
