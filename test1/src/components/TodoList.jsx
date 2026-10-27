import React, { useState } from 'react';

/**
 * Q2: Todo List Component
 * Marks: 4
 * 
 * Features:
 * - Text input to type new items
 * - Add button (and Enter key support)
 * - Dynamic list rendering entered items below
 * - Individual Delete button per item that removes only that item
 * - Input validation to avoid blank todos
 */
export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Review Node.js Event Loop' },
    { id: 2, text: 'Complete React component test' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddTodo = (e) => {
    e?.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed) {
      setErrorMsg('Please enter a valid todo text.');
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: trimmed
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputVal('');
    setErrorMsg('');
  };

  const handleDelete = (idToDelete) => {
    setTodos((prev) => prev.filter((item) => item.id !== idToDelete));
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="badge">Q2 &bull; 4 Marks</span>
        <h2>Todo List Component</h2>
        <p className="description">
          Add items via the input field and remove individual items with their Delete button.
        </p>
      </div>

      <form onSubmit={handleAddTodo} className="todo-form">
        <div className="input-group">
          <input
            type="text"
            className="text-input"
            placeholder="What do you need to do?"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              if (errorMsg) setErrorMsg('');
            }}
          />
          <button type="submit" className="btn btn-primary">
            + Add Todo
          </button>
        </div>
        {errorMsg && <p className="error-text">{errorMsg}</p>}
      </form>

      <div className="todo-list-container">
        <h3>Items List ({todos.length})</h3>
        {todos.length === 0 ? (
          <p className="empty-state">No todos yet! Add one above.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((item, index) => (
              <li key={item.id} className="todo-item">
                <span className="todo-index">{index + 1}.</span>
                <span className="todo-text">{item.text}</span>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                  title={`Delete "${item.text}"`}
                >
                  &times; Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
