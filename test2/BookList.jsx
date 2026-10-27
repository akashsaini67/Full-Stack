import React, { useState, useEffect } from 'react';

/**
 * COER UNIVERSITY, ROORKEE
 * Department of Computer Science & Engineering
 * Full Stack Web Development — Class Test
 * 
 * Q6: BookList Component
 * 
 * Requirements:
 * Calls GET /api/books using fetch() inside useEffect.
 * Correctly handles all three states:
 * 1. Loading state (shows friendly spinner/indicator)
 * 2. Error state (shows readable error message without crashing)
 * 3. Success state (renders book list, plus empty state fallback)
 */
export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController to handle cleanup on component unmount
    const controller = new AbortController();

    async function fetchBooks() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/books', {
          signal: controller.signal
        });

        // Check if HTTP response status is not 2xx
        if (!response.ok) {
          throw new Error(`Server returned error status: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setBooks(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          // Display readable error message instead of letting app crash
          setError(err.message || 'Failed to load books. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();

    return () => {
      controller.abort(); // Cancel ongoing request on unmount
    };
  }, []);

  // 1. Loading State
  if (loading) {
    return (
      <div style={styles.container}>
        <h2>Book Directory</h2>
        <div style={styles.loadingBox}>
          <div style={styles.spinner}></div>
          <p>Loading books from API...</p>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div style={styles.container}>
        <h2>Book Directory</h2>
        <div style={styles.errorBox}>
          <strong>Error loading books:</strong>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // 3. Success State
  return (
    <div style={styles.container}>
      <h2>Book Directory</h2>
      {books.length === 0 ? (
        <p style={styles.emptyText}>No books found in the library.</p>
      ) : (
        <ul style={styles.list}>
          {books.map((book) => (
            <li key={book.id} style={styles.item}>
              <div>
                <strong style={styles.title}>{book.title}</strong>
                <span style={styles.author}> by {book.author}</span>
              </div>
              <span style={styles.idBadge}>ID: #{book.id}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Inline styles for zero-dependency standalone usage
const styles = {
  container: {
    fontFamily: 'sans-serif',
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
  },
  loadingBox: {
    textAlign: 'center',
    padding: '24px',
    color: '#64748b'
  },
  spinner: {
    display: 'inline-block',
    width: '32px',
    height: '32px',
    border: '3px solid #cbd5e1',
    borderTop: '3px solid #2563eb',
    borderRadius: '50%',
    marginBottom: '8px',
    animation: 'spin 1s linear infinite'
  },
  errorBox: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    padding: '16px',
    borderRadius: '6px',
    border: '1px solid #f87171'
  },
  emptyText: {
    color: '#94a3b8',
    fontStyle: 'italic'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: '16px 0 0 0'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 14px',
    borderBottom: '1px solid #f1f5f9'
  },
  title: {
    color: '#0f172a',
    fontSize: '1rem'
  },
  author: {
    color: '#64748b',
    fontSize: '0.9rem'
  },
  idBadge: {
    backgroundColor: '#e2e8f0',
    color: '#334155',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '0.8rem'
  }
};
