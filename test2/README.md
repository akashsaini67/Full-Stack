# COER UNIVERSITY, ROORKEE
## Department of Computer Science & Engineering
### Full Stack Web Development — Class Test Solutions

- **Course:** Full Stack Web Development
- **Duration:** 1 Hour
- **Maximum Marks:** 20
- **Submission:** GitHub Public Repo / Project Folder

---

## Table of Contents
1. [Q1. Node.js — The Event Loop](#q1-nodejs--the-event-loop)
2. [Q2. Node.js — Modules](#q2-nodejs--modules)
3. [Q3. Express.js — Middleware & Routing](#q3-expressjs--middleware--routing)
4. [Q4. Express.js — Building a REST API](#q4-expressjs--building-a-rest-api)
5. [Q5. Express.js — Debugging & Error Handling](#q5-expressjs--debugging--error-handling)
6. [Q6. APIs — Consuming a REST API in React](#q6-apis--consuming-a-rest-api-in-react)
7. [Q7. APIs — CORS](#q7-apis--cors)
8. [File Structure & How to Run](#file-structure--how-to-run)

---

## Q1. Node.js — The Event Loop

### Question
> Predict the exact console output order for the code below, and justify your answer in 2–3 lines by explaining how Node.js schedules synchronous code, timers, and promises.
> ```javascript
> console.log('A');
> setTimeout(() => console.log('B'), 0);
> Promise.resolve().then(() => console.log('C'));
> console.log('D');
> ```

### Predicted Output
```text
A
D
C
B
```

### 2–3 Line Justification
1. **Synchronous Code First:** Node.js executes all synchronous statements on the Call Stack immediately from top to bottom, printing `'A'` and `'D'`.
2. **Microtasks Before Macrotasks:** When the Call Stack empties, Node.js processes the microtask queue (which holds resolved `Promise.then` callbacks) before any event loop phases, printing `'C'`.
3. **Timers Phase (Macrotask):** Finally, the event loop transitions to the Timers phase where `setTimeout` callbacks reside, printing `'B'`.

---

## Q2. Node.js — Modules

### Question
> Create a module `calc.js` that exports two functions, `add(a, b)` and `subtract(a, b)`, using `module.exports`. Then write the `require()` code in a separate file `app.js` that imports both functions and logs the result of `add(4, 5)`.

### 1. `calc.js`
```javascript
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// Export both functions using module.exports
module.exports = {
  add,
  subtract
};
```

### 2. `app.js`
```javascript
// Import both functions from calc.js using CommonJS require()
const { add, subtract } = require('./calc');

// Log the result of add(4, 5)
console.log('Result of add(4, 5):', add(4, 5)); // Output: 9
```

---

## Q3. Express.js — Middleware & Routing

### Question
> Write a complete Express setup with the following:
> - (a) A custom middleware `requireAuth` that checks for a header `x-api-key` equal to `'secret123'`. If missing or incorrect, respond with `401 Unauthorized`.
> - (b) Apply `requireAuth` ONLY to the `POST` route for a `'/api/books'` resource - the `GET` route should remain public.

### Solution (`q3_middleware.js`)
```javascript
const express = require('express');
const app = express();

app.use(express.json());

// (a) Custom authentication middleware
function requireAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === 'secret123') {
    next(); // Valid key, proceed to route handler
  } else {
    res.status(401).json({ error: 'Unauthorized: Invalid or missing x-api-key header' });
  }
}

// (b) Public GET route (no auth middleware applied)
app.get('/api/books', (req, res) => {
  res.status(200).json({ message: 'Public books list' });
});

// (b) Protected POST route (requireAuth applied specifically to this route)
app.post('/api/books', requireAuth, (req, res) => {
  res.status(201).json({ message: 'Book created successfully' });
});
```

---

## Q4. Express.js — Building a REST API

### Question
> Using a simple in-memory array, write complete Express.js code implementing the following for a “Book” resource (fields: `id`, `title`, `author`), using the correct HTTP status code in each response (e.g. 201 for creation, 404 for a missing id):
> - `GET    /api/books`        -> list all books
> - `POST   /api/books`        -> create a new book
> - `DELETE /api/books/:id`    -> delete a book (404 if id not found)

### Solution (`q4_rest_api.js`)
```javascript
const express = require('express');
const app = express();

app.use(express.json());

// In-memory array of books
let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas' }
];

// GET /api/books -> 200 OK
app.get('/api/books', (req, res) => {
  res.status(200).json(books);
});

// POST /api/books -> 201 Created
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const newBook = {
    id: Date.now(),
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// DELETE /api/books/:id -> 200 OK / 404 Not Found
app.delete('/api/books/:id', (req, res) => {
  const targetId = parseInt(req.params.id, 10);
  const index = books.findIndex((b) => b.id === targetId);

  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const [deletedBook] = books.splice(index, 1);
  res.status(200).json({ message: 'Book deleted successfully', deletedBook });
});
```

---

## Q5. Express.js — Debugging & Error Handling

### Question
> The Express app below crashes with an unhandled error whenever `GET /api/books/:id` is called with an id that doesn't exist, instead of returning a clean JSON error. Identify the bug and rewrite the code correctly.
> ```javascript
> app.get('/api/books/:id', (req, res) => {
>   const book = books.find(b => b.id == req.params.id);
>   res.json(book.title);
> });
> ```

### Bug Identification
- When the requested `id` is not in the array, `Array.prototype.find()` returns `undefined`.
- Attempting to access property `.title` on `undefined` (`undefined.title`) throws a runtime `TypeError: Cannot read properties of undefined (reading 'title')`.
- Because there is no check or try/catch, Express throws an unhandled error, resulting in a 500 Internal Server Error crash rather than a graceful 404 response.

### Correct Rewritten Code (`q5_debugging.js`)
```javascript
app.get('/api/books/:id', (req, res) => {
  const book = books.find((b) => b.id == req.params.id);

  // Check if book exists before accessing properties
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  // Safe to send response
  res.status(200).json({ title: book.title });
});
```

---

## Q6. APIs — Consuming a REST API in React

### Question
> Write a React component `BookList` that calls `GET /api/books` using `fetch()` inside `useEffect`, and correctly handles all three states: loading, error, and success — following the pattern covered in class. On error, display a readable message instead of letting the app crash.

### Solution (`BookList.jsx`)
```jsx
import React, { useState, useEffect } from 'react';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/books');

        if (!res.ok) {
          throw new Error(`Failed to fetch books: HTTP ${res.status}`);
        }

        const data = await res.json();
        setBooks(data);
      } catch (err) {
        setError(err.message || 'Something went wrong while fetching books');
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  // 1. Loading State
  if (loading) {
    return <p>Loading books, please wait...</p>;
  }

  // 2. Error State
  if (error) {
    return (
      <div style={{ color: 'red', border: '1px solid red', padding: '10px' }}>
        <strong>Error:</strong> {error}
      </div>
    );
  }

  // 3. Success State
  return (
    <div>
      <h2>Books List</h2>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## Q7. APIs — CORS

### Question
> Your React app (`http://localhost:3000`) calls your Express API (`http://localhost:5000`), and every request fails in the browser console with a CORS error, even though the same request works fine in Postman. In 2 lines, explain why this happens, and write the Express code that fixes it for local development.

### 2-Line Explanation
1. Web browsers enforce the **Same-Origin Policy (SOP)** which blocks client-side JavaScript (`http://localhost:3000`) from reading responses from a different origin (`http://localhost:5000`) unless the server returns appropriate CORS headers.
2. **Postman is a standalone HTTP client**, not a web browser, so it does not enforce the browser's Same-Origin Policy and sends/receives requests unrestricted.

### Express Code Fix (`q7_cors_server.js`)
Install the CORS package:
```bash
npm install cors
```

In Express:
```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all incoming cross-origin requests
app.use(cors());

app.use(express.json());

app.get('/api/books', (req, res) => {
  res.json([{ id: 1, title: 'Clean Code', author: 'Robert C. Martin' }]);
});

app.listen(5000, () => console.log('Server running on port 5000 with CORS enabled'));
```

---

## File Structure & How to Run

```
test2/
├── package.json        # Dependencies & test scripts
├── README.md           # Complete solutions & explanations
├── q1_event_loop.js    # Q1 Runnable snippet
├── calc.js             # Q2 Module exports
├── app.js              # Q2 require() and log demo
├── q3_middleware.js    # Q3 Express auth middleware
├── q4_rest_api.js      # Q4 REST API endpoints
├── q5_debugging.js     # Q5 Debugged route
├── BookList.jsx        # Q6 React component consuming API
├── q7_cors_server.js   # Q7 CORS enabled server
├── server.js           # Integrated Express API server
└── test_api.js         # Automated end-to-end endpoint tests
```

### Run Tests
```bash
cd test2
npm install
npm test:q1    # Runs Event Loop output prediction
npm test:q2    # Runs Modules import/export
npm run test:api # Runs all REST endpoints, auth, and error tests
```
