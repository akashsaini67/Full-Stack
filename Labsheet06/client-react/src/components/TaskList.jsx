import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Read API URL and Key from environment variables (Q5 Config)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_KEY = import.meta.env.VITE_API_KEY || 'mysecretkey123';

/**
 * TaskList Component
 * Implements the Full 3-State Pattern (loading, error, data)
 * Demonstrates both fetch() and axios comparison
 */
export default function TaskList() {
  // 1. Full 3-State Pattern via useState
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form input state
  const [newTitle, setNewTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [fetchMethod, setFetchMethod] = useState('axios'); // 'axios' or 'fetch'

  /**
   * NOTE: HOW FETCH VS AXIOS DIFFER:
   * -------------------------------------------------------------
   * 1. JSON Parsing:
   *    - fetch: requires manual 2-step `const data = await response.json()`
   *    - axios: automatically parses JSON and makes it available at `response.data`
   * 
   * 2. HTTP Error Handling:
   *    - fetch: does NOT reject the promise on 4xx/5xx status codes. You MUST manually
   *             check `if (!response.ok)` and throw an error.
   *    - axios: automatically throws an error on any non-2xx HTTP status, allowing
   *             centralized catch blocks where `err.response.data` contains server error info.
   * -------------------------------------------------------------
   */

  // Fetch using Axios
  const loadTasksAxios = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      // Axios auto-unpacks JSON into response.data
      setTasks(response.data.data || []);
    } catch (err) {
      console.error('Axios Fetch Error:', err);
      const serverMsg = err.response?.data?.error || err.message;
      setError(`Failed to fetch tasks (Axios): ${serverMsg}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch using native fetch()
  const loadTasksFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      setTasks(json.data || []);
    } catch (err) {
      console.error('Native fetch() Error:', err);
      setError(`Failed to fetch tasks (fetch): ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Run on component mount
  useEffect(() => {
    if (fetchMethod === 'axios') {
      loadTasksAxios();
    } else {
      loadTasksFetch();
    }
  }, [fetchMethod]);

  // Form Handler: POST /api/tasks
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setActionError('Task title cannot be empty.');
      return;
    }

    setSubmitting(true);
    setActionError(null);

    try {
      // POST with Content-Type and x-api-key headers
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({
          title: newTitle.trim(),
          completed: false,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error ${response.status}`);
      }

      // Update UI state immediately without page reload
      setTasks((prevTasks) => [...prevTasks, result.data]);
      setNewTitle('');
    } catch (err) {
      console.error('POST Task Error:', err);
      setActionError(`Error adding task: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Handler: DELETE /api/tasks/:id
  const handleDeleteTask = async (taskId) => {
    setActionError(null);
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'x-api-key': API_KEY,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Delete failed with status ${response.status}`);
      }

      // Immediately remove from UI
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error('DELETE Task Error:', err);
      // Graceful error display (e.g. 404 or 401)
      setActionError(`Delete failed: ${err.message}`);
    }
  };

  // Test Handler: Delete with Invalid ID 9999 (Q5 Requirement)
  const handleTestInvalidDelete = () => {
    handleDeleteTask(9999);
  };

  return (
    <div className="task-container">
      {/* Header & Library Selector */}
      <div className="task-header">
        <div>
          <h2>Task Manager Mini App</h2>
          <p className="subtitle">
            Connecting React Frontend to Node.js/Express REST API with full 3-state pipeline.
          </p>
        </div>

        <div className="method-toggle">
          <label>Fetch Library:</label>
          <select
            value={fetchMethod}
            onChange={(e) => setFetchMethod(e.target.value)}
            className="select-input"
          >
            <option value="axios">Axios (auto JSON &amp; status reject)</option>
            <option value="fetch">fetch() (manual json() &amp; response.ok)</option>
          </select>
        </div>
      </div>

      {/* Action Error Banner (e.g., 404/401 Graceful Error Handling) */}
      {actionError && (
        <div className="alert-banner error-banner">
          <span>⚠️ {actionError}</span>
          <button className="close-banner-btn" onClick={() => setActionError(null)}>
            &times;
          </button>
        </div>
      )}

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          className="task-input"
          placeholder="Enter a new task title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          disabled={submitting}
        />
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Adding...' : '+ Add Task'}
        </button>
      </form>

      {/* Test Invalid Delete Button for Q5 testing */}
      <div style={{ textAlign: 'right', marginBottom: '1.25rem' }}>
        <button
          type="button"
          onClick={handleTestInvalidDelete}
          className="btn btn-outline-danger btn-sm"
          title="Sends DELETE /api/tasks/9999 to test 404 error handling"
        >
          🧪 Test Invalid Delete (ID: 9999)
        </button>
      </div>

      {/* 2. Loading State */}
      {loading && (
        <div className="state-box loading-box">
          <div className="spinner"></div>
          <span>Loading tasks from backend ({fetchMethod})...</span>
        </div>
      )}

      {/* 3. Error State */}
      {!loading && error && (
        <div className="state-box error-box">
          <h3>Failed to load tasks</h3>
          <p>{error}</p>
          <button
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '0.75rem' }}
            onClick={fetchMethod === 'axios' ? loadTasksAxios : loadTasksFetch}
          >
            Retry Loading
          </button>
        </div>
      )}

      {/* 4. Data State */}
      {!loading && !error && (
        <div className="tasks-card">
          <div className="tasks-count-bar">
            <span>Total Tasks: <strong>{tasks.length}</strong></span>
            <span>API URL: <code>{API_URL}</code></span>
          </div>

          {tasks.length === 0 ? (
            <p className="empty-notice">No tasks found. Add a task above!</p>
          ) : (
            <ul className="tasks-list">
              {tasks.map((task) => (
                <li key={task.id} className="task-row">
                  <div className="task-meta">
                    <span className="task-id-badge">#{task.id}</span>
                    <span
                      className={`task-label ${task.completed ? 'task-done' : ''}`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <div className="task-actions">
                    <span
                      className={`status-pill ${
                        task.completed ? 'pill-completed' : 'pill-pending'
                      }`}
                    >
                      {task.completed ? 'Completed' : 'Pending'}
                    </span>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteTask(task.id)}
                      title="Delete this task"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
