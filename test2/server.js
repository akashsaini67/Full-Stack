/**
 * COER UNIVERSITY, ROORKEE
 * Department of Computer Science & Engineering
 * Full Stack Web Development — Class Test Solutions
 * 
 * Integrated Server demonstrating Q3, Q4, Q5, and Q7 together.
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Q7: Enable CORS to allow cross-origin requests from React (e.g. localhost:3000)
app.use(cors());

// In-Memory Database for "Book" resource (fields: id, title, author)
let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas' },
  { id: 3, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford' }
];

let nextId = 4;

/**
 * Q3(a): Custom Authentication Middleware 'requireAuth'
 * Checks for header 'x-api-key' === 'secret123'
 * If missing or incorrect, returns 401 Unauthorized
 */
function requireAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== 'secret123') {
    return res.status(401).json({
      error: 'Unauthorized: Invalid or missing x-api-key header'
    });
  }
  next();
}

// Root route with test information
app.get('/', (req, res) => {
  res.json({
    university: 'COER University, Roorkee',
    subject: 'Full Stack Web Development - Class Test 2 API',
    endpoints: {
      'GET /api/books': 'List all books (Public)',
      'GET /api/books/:id': 'Get book by ID with safe error handling (Q5)',
      'POST /api/books': 'Create a new book (Protected by requireAuth, Q3 & Q4)',
      'DELETE /api/books/:id': 'Delete book by ID (Q4)'
    }
  });
});

/**
 * Q4: GET /api/books -> List all books (Public route)
 * Status: 200 OK
 */
app.get('/api/books', (req, res) => {
  res.status(200).json(books);
});

/**
 * Q5: GET /api/books/:id -> Safely retrieve a book with 404 handling
 * Prevents crash when ID is not found.
 */
app.get('/api/books/:id', (req, res) => {
  const book = books.find((b) => b.id == req.params.id);

  if (!book) {
    return res.status(404).json({
      error: `Book with id ${req.params.id} not found.`
    });
  }

  res.status(200).json(book);
});

/**
 * Q3 & Q4: POST /api/books -> Create a new book
 * - requireAuth applied specifically to POST route (Q3)
 * - Returns 201 Created on success (Q4)
 */
app.post('/api/books', requireAuth, (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Both title and author are required.' });
  }

  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim()
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

/**
 * Q4: DELETE /api/books/:id -> Delete a book
 * Returns 404 if not found, 200 OK with deleted book on success
 */
app.delete('/api/books/:id', (req, res) => {
  const targetId = parseInt(req.params.id, 10);
  const index = books.findIndex((b) => b.id === targetId);

  if (index === -1) {
    return res.status(404).json({
      error: `Book with id ${req.params.id} not found.`
    });
  }

  const [deletedBook] = books.splice(index, 1);
  res.status(200).json({
    message: 'Book deleted successfully',
    deletedBook
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

module.exports = { app, books };
