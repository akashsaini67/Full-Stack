import React, { useState } from 'react';

/**
 * Q1: Counter Component
 * Marks: 4
 * 
 * Features:
 * - Running count displayed clearly
 * - Increment button (increases count by 1)
 * - Decrement button (decreases count by 1, disabled when count is 0)
 * - Reset button (resets count to 0)
 */
export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="badge">Q1 &bull; 4 Marks</span>
        <h2>Counter Component</h2>
        <p className="description">
          Running count with Increment, Decrement, and Reset. Decrement is disabled when count is 0.
        </p>
      </div>

      <div className="counter-display">
        <span className="count-label">Current Count</span>
        <span className="count-value">{count}</span>
        {count === 0 && (
          <span className="info-tag">Minimum limit reached (0) - Decrement disabled</span>
        )}
      </div>

      <div className="button-group">
        <button
          type="button"
          className="btn btn-success"
          onClick={increment}
        >
          + Increment
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={decrement}
          disabled={count === 0}
          title={count === 0 ? 'Count is 0, decrement is disabled' : 'Decrement by 1'}
        >
          &minus; Decrement
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={reset}
          disabled={count === 0}
        >
          &#8634; Reset
        </button>
      </div>
    </div>
  );
}
