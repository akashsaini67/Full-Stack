/**
 * COER UNIVERSITY, ROORKEE
 * Department of Computer Science & Engineering
 * Full Stack Web Development — Class Test
 * 
 * Q3: Express.js — Middleware & Routing
 * 
 * Requirements:
 * (a) Custom middleware 'requireAuth' checking header 'x-api-key' === 'secret123'.
 *     Responds with 401 Unauthorized if missing or incorrect.
 * (b) Apply requireAuth ONLY to the POST route for '/api/books'.
 *     GET route remains public.
 */

const express = require('express');
const app = express();

app.use(express.json());

// In-memory data for demo
const books = [
  { id: 1, title: 'Node.js Design Patterns', author: 'Mario Casciaro' },
  { id: 2, title: 'Eloquent JavaScript', author: 'Marijn Haverbeke' }
];

/**
 * (a) Custom Authentication Middleware 'requireAuth'
 */
function requireAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== 'secret123') {
    return res.status(401).json({
      error: 'Unauthorized: Invalid or missing x-api-key header'
    });
  }

  // Key is valid; proceed to next handler
  next();
}

/**
 * (b) Public GET route (does NOT use requireAuth)
 */
app.get('/api/books', (req, res) => {
  res.status(200).json({
    message: 'Publicly accessible books list',
    books: books
  });
});

/**
 * (b) Protected POST route (uses requireAuth middleware)
 */
app.post('/api/books', requireAuth, (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);

  res.status(201).json({
    message: 'Book added successfully through authenticated POST route',
    book: newBook
  });
});

// Export app or listen if executed directly
if (require.main === module) {
  const PORT = process.env.PORT || 4001;
  app.listen(PORT, () => {
    console.log(`Q3 Middleware Server running on http://localhost:${PORT}`);
  });
}

module.exports = { app, requireAuth };
