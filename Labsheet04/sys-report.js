/**
 * Task 5: OS Module Report
 * File: sys-report.js
 * Operations:
 * Uses the Node.js 'os' module to inspect and print system telemetry:
 * - Platform
 * - Architecture
 * - Total Memory (in GB/MB)
 * - Free Memory (in GB/MB)
 * - Number of CPU cores & Model
 * - System Uptime in minutes
 * Run: node sys-report.js
 */

const os = require('os');

console.log('==============================================');
console.log('Task 5: Operating System Diagnostics Report');
console.log('==============================================\n');

// 1. Platform & Architecture
const platform = os.platform();
const arch = os.arch();
console.log(`OS Platform:         ${platform} (${os.type()})`);
console.log(`Architecture:        ${arch}`);

// 2. Memory
const totalMemBytes = os.totalmem();
const freeMemBytes = os.freemem();
const totalMemGB = (totalMemBytes / (1024 ** 3)).toFixed(2);
const freeMemGB = (freeMemBytes / (1024 ** 3)).toFixed(2);
const memUsagePercent = (((totalMemBytes - freeMemBytes) / totalMemBytes) * 100).toFixed(1);

console.log(`Total RAM:           ${totalMemGB} GB (${totalMemBytes} bytes)`);
console.log(`Free RAM:            ${freeMemGB} GB (${freeMemBytes} bytes)`);
console.log(`Memory Usage:        ${memUsagePercent}%`);

// 3. CPU Cores
const cpus = os.cpus();
console.log(`CPU Model:           ${cpus[0]?.model || 'N/A'}`);
console.log(`Number of CPU Cores: ${cpus.length}`);

// 4. System Uptime
const uptimeSeconds = os.uptime();
const uptimeMinutes = (uptimeSeconds / 60).toFixed(2);
const uptimeHours = (uptimeSeconds / 3600).toFixed(2);
console.log(`System Uptime:       ${uptimeMinutes} minutes (~${uptimeHours} hours)`);

console.log('\nTask 5 completed successfully.');
