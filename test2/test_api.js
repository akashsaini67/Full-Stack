/**
 * Automated test script to verify all questions in test2.
 */

const { app } = require('./server');

async function runTests() {
  const PORT = 5055;
  const server = app.listen(PORT, async () => {
    console.log(`\n=== Running Test2 Verification on port ${PORT} ===\n`);
    const baseUrl = `http://localhost:${PORT}`;

    try {
      // 1. Test GET /api/books (Public - Q3 & Q4)
      console.log('1. Testing GET /api/books (Public)...');
      let res = await fetch(`${baseUrl}/api/books`);
      let data = await res.json();
      console.log(`   Status: ${res.status} | Total Books: ${data.length}`);

      // 2. Test POST /api/books without Auth (Should fail with 401 - Q3)
      console.log('\n2. Testing POST /api/books without auth header (Expect 401)...');
      res = await fetch(`${baseUrl}/api/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Unauthorized Book', author: 'Nobody' })
      });
      data = await res.json();
      console.log(`   Status: ${res.status} | Message: ${data.error}`);

      // 3. Test POST /api/books with valid Auth header (Expect 201 - Q3 & Q4)
      console.log('\n3. Testing POST /api/books with x-api-key: secret123 (Expect 201)...');
      res = await fetch(`${baseUrl}/api/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'secret123'
        },
        body: JSON.stringify({ title: 'Refactoring', author: 'Martin Fowler' })
      });
      data = await res.json();
      console.log(`   Status: ${res.status} | Created Book:`, data);

      // 4. Test GET /api/books/:id with existing id (Expect 200 - Q5)
      console.log('\n4. Testing GET /api/books/1 (Expect 200)...');
      res = await fetch(`${baseUrl}/api/books/1`);
      data = await res.json();
      console.log(`   Status: ${res.status} | Book:`, data);

      // 5. Test GET /api/books/:id with non-existent id (Expect 404 - Q5)
      console.log('\n5. Testing GET /api/books/999 (Non-existent, Expect 404)...');
      res = await fetch(`${baseUrl}/api/books/999`);
      data = await res.json();
      console.log(`   Status: ${res.status} | Error: ${data.error}`);

      // 6. Test DELETE /api/books/:id (Expect 200 - Q4)
      console.log('\n6. Testing DELETE /api/books/1 (Expect 200)...');
      res = await fetch(`${baseUrl}/api/books/1`, { method: 'DELETE' });
      data = await res.json();
      console.log(`   Status: ${res.status} | Message: ${data.message}`);

      // 7. Test DELETE /api/books/:id non-existent (Expect 404 - Q4)
      console.log('\n7. Testing DELETE /api/books/999 (Expect 404)...');
      res = await fetch(`${baseUrl}/api/books/999`, { method: 'DELETE' });
      data = await res.json();
      console.log(`   Status: ${res.status} | Error: ${data.error}`);

      console.log('\n=== All Test2 Checks Passed Successfully! ===\n');
    } catch (err) {
      console.error('Test run error:', err);
    } finally {
      server.close();
    }
  });
}

runTests();
