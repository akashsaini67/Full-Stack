/**
 * COER UNIVERSITY, ROORKEE
 * Department of Computer Science & Engineering
 * Full Stack Web Development — Class Test
 * 
 * Q4: Express.js — Building a REST API
 * 
 * Requirements:
 * Simple in-memory array for "Book" resource (fields: id, title, author).
 * Proper HTTP status codes:
 * - GET    /api/books        -> 200 OK (list all books)
 * - POST   /api/books        -> 201 Created (create a new book)
 * - DELETE /api/books/:id    -> 200 OK (delete a book, or 404 if id not found)
 */

const express = require('express');
const app = express();

app.use(express.json());

// In-memory array of books
let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas' },
  { id: 3, title: 'You Don’t Know JS', author: 'Kyle Simpson' }
];

let nextId = 4;

/**
 * GET /api/books -> List all books
 * Status: 200 OK
 */
app.get('/api/books', (req, res) => {
  res.status(200).json(books);
});

/**
 * POST /api/books -> Create a new book
 * Status: 201 Created
 */
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required fields.' });
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
 * DELETE /api/books/:id -> Delete a book by ID
 * Status: 200 OK on success, 404 Not Found if ID does not exist
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
    message: 'Book successfully deleted.',
    deletedBook
  });
});

if (require.main === module) {
  const PORT = process.env.PORT || 4002;
  app.listen(PORT, () => {
    console.log(`Q4 REST API Server running on http://localhost:${PORT}`);
  });
}

module.exports = { app, books };
