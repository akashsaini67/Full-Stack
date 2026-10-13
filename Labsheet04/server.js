/**
 * Task 7 & Task 8: HTTP Server with Manual Routing & Query String Parsing
 * File: server.js
 * No external framework used (Vanilla Node.js 'http' and 'url' modules).
 *
 * Routes Supported:
 * 1. GET /              -> Welcome message (HTML / Text)
 * 2. GET /students      -> JSON array of 3 hardcoded students
 * 3. GET /students/:id  -> JSON object of matching student or 404 JSON error
 * 4. GET /search?keyword=... -> Echoes query parameters back in response (Task 8)
 * 5. Other routes       -> 404 Not Found response
 *
 * Run: node server.js
 */

const http = require('http');
const url = require('url');

const PORT = 3000;

// Hardcoded students database
const students = [
  { id: 1, name: 'Akash Saini', rollNo: '22001015001', branch: 'CSE', gpa: 8.9 },
  { id: 2, name: 'Riya Verma', rollNo: '22001015002', branch: 'CSE', gpa: 9.2 },
  { id: 3, name: 'Rohan Gupta', rollNo: '22001015003', branch: 'CSE', gpa: 8.5 }
];

const server = http.createServer((req, res) => {
  // Parse incoming URL and query string
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  const method = req.method;

  console.log(`[${new Date().toISOString()}] ${method} ${req.url}`);

  // Route 1: GET / (Welcome Message)
  if (method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>Full Stack Node Server</title></head>
      <body style="font-family: sans-serif; padding: 2rem; line-height: 1.6;">
        <h1>🎓 Welcome to COER University Student API Server!</h1>
        <p>This server is built using raw Node.js <code>http</code> and <code>url</code> modules without any external framework.</p>
        <h3>Available Endpoints:</h3>
        <ul>
          <li><a href="/students">GET /students</a> - View all students (JSON)</li>
          <li><a href="/students/1">GET /students/1</a> - View student #1 (JSON)</li>
          <li><a href="/students/99">GET /students/99</a> - View non-existent student (404 Error)</li>
          <li><a href="/search?keyword=nodejs&category=fullstack">GET /search?keyword=nodejs&category=fullstack</a> - Query parser test</li>
        </ul>
      </body>
      </html>
    `);
    return;
  }

  // Route 2: GET /students (JSON Array of 3 students)
  if (method === 'GET' && pathname === '/students') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, count: students.length, data: students }, null, 2));
    return;
  }

  // Route 3: GET /students/:id (Parse student ID from req.url)
  const studentIdMatch = pathname.match(/^\/students\/(\d+)$/);
  if (method === 'GET' && studentIdMatch) {
    const studentId = parseInt(studentIdMatch[1], 10);
    const student = students.find((s) => s.id === studentId);

    if (student) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: student }, null, 2));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        error: `Student with id ${studentId} not found.`
      }, null, 2));
    }
    return;
  }

  // Route 4: GET /search (Task 8: Query String Parsing)
  if (method === 'GET' && pathname === '/search') {
    const keyword = query.keyword || 'None provided';
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Query string parsed successfully',
      searchedKeyword: keyword,
      allQueryParams: query
    }, null, 2));
    return;
  }

  // Fallback Route: 404 Not Found
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: false,
    status: 404,
    message: `Endpoint ${method} ${pathname} does not exist.`
  }, null, 2));
});

// Start the server
server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Testing Routes:`);
  console.log(`  1. http://localhost:${PORT}/`);
  console.log(`  2. http://localhost:${PORT}/students`);
  console.log(`  3. http://localhost:${PORT}/students/1`);
  console.log(`  4. http://localhost:${PORT}/search?keyword=node`);
  console.log(`=======================================================`);
});
