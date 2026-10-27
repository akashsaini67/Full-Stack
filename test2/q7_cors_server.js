/**
 * COER UNIVERSITY, ROORKEE
 * Department of Computer Science & Engineering
 * Full Stack Web Development — Class Test
 * 
 * Q7: APIs — CORS
 * 
 * ==============================================================================
 * EXPLANATION (IN 2 LINES):
 * ==============================================================================
 * 1. Web browsers enforce the Same-Origin Policy (SOP) and block cross-origin requests
 *    (localhost:3000 -> localhost:5000) unless the server explicitly sends CORS headers.
 * 2. Postman is a backend/desktop HTTP testing tool without browser security sandbox
 *    restrictions, so it does not enforce the Same-Origin Policy and succeeds.
 * 
 * ==============================================================================
 * EXPRESS CODE THAT FIXES IT FOR LOCAL DEVELOPMENT:
 * ==============================================================================
 */

const express = require('express');
const cors = require('cors'); // npm install cors

const app = express();
const PORT = 5000;

// Enable CORS for all routes and origins (or configure specific origin)
// Option A: Allow all origins (standard for local dev):
app.use(cors());

// Option B: Specifically allow only the React dev client origin:
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

app.use(express.json());

// Sample endpoint called by React (http://localhost:3000)
app.get('/api/books', (req, res) => {
  res.json([
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas' }
  ]);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Q7 CORS-enabled Express server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
