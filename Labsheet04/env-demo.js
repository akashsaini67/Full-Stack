/**
 * Task 12: Environment Variables
 * File: env-demo.js
 * Operations:
 * Reads PORT from process.env (defaults to 4000 if not set).
 * Starts an HTTP server on that port and logs the active port on start.
 *
 * Run Examples:
 *   node env-demo.js                    (runs on default port 4000)
 *   $env:PORT=5000; node env-demo.js    (PowerShell, runs on port 5000)
 *   set PORT=5000 && node env-demo.js   (Windows CMD, runs on port 5000)
 */

const http = require('http');

// Read PORT from process.env, defaulting to 4000 if not set
const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: 'Environment Variable Server is running',
    activePort: PORT,
    source: process.env.PORT ? 'process.env.PORT' : 'Default Fallback (4000)',
    nodeVersion: process.version
  }, null, 2));
});

server.listen(PORT, () => {
  console.log('==============================================');
  console.log('Task 12: Node.js Environment Variable Server');
  console.log('==============================================');
  console.log(`Server started successfully on PORT: ${PORT}`);
  console.log(`Config source: ${process.env.PORT ? 'Loaded from environment (process.env.PORT)' : 'Using default fallback (4000)'}`);
  console.log(`Test URL: http://localhost:${PORT}/`);
  console.log('==============================================');
});
