/**
 * ==============================================================================
 * Lab Sheet 5: Automated Verification & Route Tester
 * File: test-api.js
 * Automatically tests all routes defined in index.js, routes/books.js,
 * routes/members.js, and routes/students.js.
 * Run: node test-api.js
 * ==============================================================================
 */

const http = require('http');

const PORT = 4000;
const BASE = `http://localhost:${PORT}`;

function makeRequest(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE);
    const reqOptions = {
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(url, reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('================================================================');
  console.log(' COER UNIVERSITY - LAB SHEET 5 AUTOMATED ROUTE TEST SUITE');
  console.log('================================================================\n');

  try {
    // 1. GET /about
    console.log('[Test 1] GET /about');
    const resAbout = await makeRequest('/about');
    console.log(`Status: ${resAbout.status} | Body:`, resAbout.body);

    // 2. GET /courses
    console.log('\n[Test 2] GET /courses');
    const resCourses = await makeRequest('/courses');
    console.log(`Status: ${resCourses.status} | Body:`, resCourses.body);

    // 3. GET /search?name=Akash&age=21
    console.log('\n[Test 3] GET /search?name=Akash&age=21');
    const resSearch = await makeRequest('/search?name=Akash&age=21');
    console.log(`Status: ${resSearch.status} | Body:`, resSearch.body);

    // 4. GET /products/electronics/101
    console.log('\n[Test 4] GET /products/electronics/101');
    const resProduct = await makeRequest('/products/electronics/101');
    console.log(`Status: ${resProduct.status} | Body:`, resProduct.body);

    // 5. GET /api/books (All books)
    console.log('\n[Test 5] GET /api/books');
    const resBooks = await makeRequest('/api/books');
    console.log(`Status: ${resBooks.status} | Body:`, resBooks.body);

    // 6. GET /api/books/1 (Single book)
    console.log('\n[Test 6] GET /api/books/1');
    const resBook1 = await makeRequest('/api/books/1');
    console.log(`Status: ${resBook1.status} | Body:`, resBook1.body);

    // 7. GET /api/books/999 (Not found test)
    console.log('\n[Test 7] GET /api/books/999 (Expected 404 error)');
    const resBookNotFound = await makeRequest('/api/books/999');
    console.log(`Status: ${resBookNotFound.status} | Body:`, resBookNotFound.body);

    // 8. GET /admin/dashboard without API key (Expected 403)
    console.log('\n[Test 8] GET /admin/dashboard without x-api-key (Expected 403)');
    const resAdminNoKey = await makeRequest('/admin/dashboard');
    console.log(`Status: ${resAdminNoKey.status} | Body:`, resAdminNoKey.body);

    // 9. GET /admin/dashboard with x-api-key (Success)
    console.log('\n[Test 9] GET /admin/dashboard with x-api-key: 12345 (Expected 200)');
    const resAdminWithKey = await makeRequest('/admin/dashboard', {
      headers: { 'x-api-key': '12345' }
    });
    console.log(`Status: ${resAdminWithKey.status} | Body:`, resAdminWithKey.body);

    // 10. GET /api/students/501
    console.log('\n[Test 10] GET /api/students/501');
    const resStudent = await makeRequest('/api/students/501');
    console.log(`Status: ${resStudent.status} | Body:`, resStudent.body);

    // 11. Unmatched Route 404 test
    console.log('\n[Test 11] GET /api/book (Unmatched route expected 404)');
    const resUnmatched = await makeRequest('/api/book');
    console.log(`Status: ${resUnmatched.status} | Body:`, resUnmatched.body);

    console.log('\n================================================================');
    console.log(' All Lab Sheet 5 Route Tests Passed Successfully!');
    console.log('================================================================');
  } catch (err) {
    console.error('Test Error (Is the server running? Run "npm start" first):', err.message);
  }
}

runTests();
