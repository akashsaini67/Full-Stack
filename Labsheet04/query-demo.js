/**
 * Task 8: Query String Parsing
 * File: query-demo.js
 * Creates an HTTP server that parses query parameters using:
 * require('url').parse(req.url, true).query
 * Run: node query-demo.js
 * Test: http://localhost:3001/search?keyword=node&page=2
 */

const http = require('http');
const url = require('url');

const PORT = 3001;

const server = http.createServer((req, res) => {
  // Parse URL and query string with parse(req.url, true)
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  console.log(`Received request: ${req.url}`);

  if (pathname === '/search') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const responsePayload = {
      status: 'Success',
      route: '/search',
      receivedQuery: query,
      keyword: query.keyword || null,
      message: query.keyword
        ? `Searched for keyword: "${query.keyword}"`
        : 'No keyword parameter provided in URL.'
    };
    res.end(JSON.stringify(responsePayload, null, 2));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h3>Query String Parser Demo</h3>
      <p>Try testing with query parameters:</p>
      <ul>
        <li><a href="/search?keyword=node">/search?keyword=node</a></li>
        <li><a href="/search?keyword=express&author=cse">/search?keyword=express&author=cse</a></li>
      </ul>
    `);
  }
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`Task 8 Query Server running on http://localhost:${PORT}/search?keyword=node`);
  console.log(`=======================================================`);
});
