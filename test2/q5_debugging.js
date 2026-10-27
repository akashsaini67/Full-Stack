/**
 * COER UNIVERSITY, ROORKEE
 * Department of Computer Science & Engineering
 * Full Stack Web Development — Class Test
 * 
 * Q5: Express.js — Debugging & Error Handling
 * 
 * ==============================================================================
 * 1. BUG IDENTIFICATION:
 * ==============================================================================
 * In the given snippet:
 *   const book = books.find(b => b.id == req.params.id);
 *   res.json(book.title);
 * 
 * When a client requests an `id` that does NOT exist in the `books` array,
 * `Array.prototype.find()` returns `undefined`.
 * Attempting to access property `.title` on `undefined` causes JavaScript to throw:
 *   TypeError: Cannot read properties of undefined (reading 'title')
 * 
 * In Express, this uncaught exception crashes the route handler, resulting in an
 * unhandled 500 Internal Server Error (or server crash) instead of returning
 * a clean, informative 404 client error with JSON response.
 * 
 * ==============================================================================
 * 2. CORRECT REWRITTEN CODE:
 * ==============================================================================
 */

const express = require('express');
const app = express();

app.use(express.json());

const books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas' }
];

// Corrected Route Handler
app.get('/api/books/:id', (req, res) => {
  const book = books.find((b) => b.id == req.params.id);

  // Check if book exists before accessing properties
  if (!book) {
    return res.status(404).json({
      error: `Book with id ${req.params.id} not found.`
    });
  }

  // Safely return the book or title with 200 OK
  res.status(200).json({
    id: book.id,
    title: book.title,
    author: book.author
  });
});

if (require.main === module) {
  const PORT = process.env.PORT || 4003;
  app.listen(PORT, () => {
    console.log(`Q5 Debugging Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
