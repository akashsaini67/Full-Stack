/**
 * Task 11: Command-Line Arguments Calculator
 * File: calc-cli.js
 * Operations:
 * Accepts two numbers and an arithmetic operator (+, -, *, /) via process.argv
 * and calculates the result.
 *
 * Usage:
 *   node calc-cli.js <number1> <number2> <operator>
 * Example:
 *   node calc-cli.js 10 5 +
 *   node calc-cli.js 20 4 *
 */

// process.argv[0] is node path, process.argv[1] is script path
const args = process.argv.slice(2);

console.log('==============================================');
console.log('Task 11: CLI Calculator with process.argv');
console.log('==============================================\n');

if (args.length < 3) {
  console.log('❌ Error: Missing required arguments.');
  console.log('Usage: node calc-cli.js <number1> <number2> <operator>');
  console.log('Example: node calc-cli.js 10 5 +');
  console.log('Supported operators: +, -, *, /, x');
  process.exit(1);
}

const num1 = parseFloat(args[0]);
const num2 = parseFloat(args[1]);
const operator = args[2];

if (isNaN(num1) || isNaN(num2)) {
  console.log('❌ Error: Both arguments must be valid numbers.');
  console.log(`Received: "${args[0]}" and "${args[1]}"`);
  process.exit(1);
}

let result;

switch (operator) {
  case '+':
    result = num1 + num2;
    break;
  case '-':
    result = num1 - num2;
    break;
  case '*':
  case 'x':
  case 'X':
    result = num1 * num2;
    break;
  case '/':
    if (num2 === 0) {
      console.log('❌ Error: Division by zero is undefined.');
      process.exit(1);
    }
    result = num1 / num2;
    break;
  default:
    console.log(`❌ Error: Unsupported operator "${operator}".`);
    console.log('Supported operators: +, -, *, /');
    process.exit(1);
}

console.log(`Operation: ${num1} ${operator} ${num2}`);
console.log(`Result:    ${result}`);
console.log('\nTask 11 completed successfully.');
