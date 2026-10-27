import React, { useState } from 'react';

/**
 * Q4: Live Search Filter Component
 * Marks: 4
 * 
 * Features:
 * - Hardcoded list of >= 8 names
 * - Search input that filters dynamically on every keystroke
 * - Case-insensitive matching
 * - Shows "No results found" when no name matches the query
 */
export default function LiveSearchFilter() {
  // Hardcoded list of 10 student names (minimum 8 required by prompt)
  const initialNames = [
    'Aarav Sharma',
    'Ananya Verma',
    'Rohan Patel',
    'Priya Singh',
    'Vikram Malhotra',
    'Sneha Gupta',
    'Amit Kumar',
    'Neha Joshi',
    'Rahul Mehta',
    'Pooja Choudhary'
  ];

  const [searchQuery, setSearchQuery] = useState('');

  // Filter list on every keystroke (case-insensitive)
  const filteredNames = initialNames.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="card">
      <div className="card-header">
        <span className="badge">Q4 &bull; 4 Marks</span>
        <h2>Live Search Filter Component</h2>
        <p className="description">
          Filters a list of {initialNames.length} names in real-time on every keystroke.
        </p>
      </div>

      <div className="search-box-container">
        <div className="input-group">
          <input
            type="text"
            className="text-input"
            placeholder="Type a name to search (e.g. Priya, Rahul)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSearchQuery('')}
            >
              Clear
            </button>
          )}
        </div>
        <div className="search-stats">
          <span>Total names: {initialNames.length}</span>
          <span>Matches: {filteredNames.length}</span>
        </div>
      </div>

      <div className="search-results-container">
        {filteredNames.length > 0 ? (
          <ul className="name-list">
            {filteredNames.map((name, index) => (
              <li key={index} className="name-item">
                <span className="name-avatar">{name.charAt(0)}</span>
                <span className="name-text">{name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-results-box">
            <span className="no-results-icon">&#128269;</span>
            <p className="no-results-text">No results found for "{searchQuery}"</p>
            <p className="no-results-hint">Try searching with different letters</p>
          </div>
        )}
      </div>
    </div>
  );
}
