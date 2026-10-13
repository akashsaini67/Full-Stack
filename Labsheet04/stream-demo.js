/**
 * Task 9: Reading a Large File with Streams
 * File: stream-demo.js
 * Operations:
 * 1. Creates a text file 'large-file.txt' with at least 50 lines using a loop.
 * 2. Reads it back chunk-by-chunk using fs.createReadStream.
 * 3. Logs each chunk size received on the 'data' event.
 * 4. Summarizes total bytes on the 'end' event.
 * Use: fs.createReadStream, 'data' event, 'end' event
 * Run: node stream-demo.js
 */

const fs = require('fs');
const path = require('path');

const targetFilePath = path.join(__dirname, 'large-file.txt');

console.log('==============================================');
console.log('Task 9: Stream Processing in Node.js');
console.log('==============================================\n');

// Step 1: Generate a text file with 60 lines (more than the required 50 lines)
console.log('[Step 1] Generating text file with 60 lines...');
let fileContent = '';
for (let i = 1; i <= 60; i++) {
  fileContent += `Line ${String(i).padStart(2, '0')}: COER University - Full Stack Development Lab 4 Stream Processing Demo Buffer Test (${new Date().toISOString()})\n`;
}

fs.writeFileSync(targetFilePath, fileContent, 'utf8');
console.log(`[Step 1] File successfully written to: ${targetFilePath}`);
console.log(`Total generated file size: ${Buffer.byteLength(fileContent)} bytes.\n`);

// Step 2: Read back using fs.createReadStream
// Using a small highWaterMark (e.g. 512 bytes) to clearly illustrate multiple chunk deliveries
console.log('[Step 2] Reading file using fs.createReadStream...');
const readStream = fs.createReadStream(targetFilePath, {
  encoding: 'utf8',
  highWaterMark: 512 // 512 bytes per buffer chunk to demo streaming chunks
});

let chunkCount = 0;
let totalBytesReceived = 0;

// Listen to 'data' event for each chunk
readStream.on('data', (chunk) => {
  chunkCount++;
  const chunkSize = Buffer.byteLength(chunk, 'utf8');
  totalBytesReceived += chunkSize;
  console.log(`[Stream Event: 'data'] Chunk #${chunkCount} received -> Size: ${chunkSize} bytes`);
});

// Listen to 'end' event when reading finishes
readStream.on('end', () => {
  console.log(`\n[Stream Event: 'end'] Completed reading the entire stream.`);
  console.log(`Summary: Received ${chunkCount} chunks, totaling ${totalBytesReceived} bytes.`);
  console.log('\nTask 9 completed successfully.');
});

// Error handling
readStream.on('error', (err) => {
  console.error('Stream reading error:', err);
});
