/**
 * Lab Sheet 6 - Plain JavaScript Client
 * Consumes Express REST API via fetch() with Loading and Error states
 */

const API_BASE_URL = 'http://localhost:5000/api/tasks';

const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const taskList = document.getElementById('taskList');
const retryBtn = document.getElementById('retryBtn');

/**
 * Fetch and render tasks from the Express backend
 */
async function fetchTasks() {
  // 1. Show Loading State & Reset previous errors/data
  loadingIndicator.style.display = 'flex';
  errorMessage.style.display = 'none';
  taskList.innerHTML = '';

  try {
    const response = await fetch(API_BASE_URL);

    // Check if HTTP status is not OK (e.g. 500, 404)
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    // Hide loading
    loadingIndicator.style.display = 'none';

    // Verify received data shape
    const tasks = result.data || [];

    if (tasks.length === 0) {
      taskList.innerHTML = '<li style="padding: 1rem; color: #64748b; text-align: center;">No tasks found.</li>';
      return;
    }

    // 2. Render tasks cleanly
    taskList.innerHTML = tasks.map((task) => `
      <li class="task-item">
        <div class="task-title">
          <span>${task.completed ? '✅' : '⏳'}</span>
          <span style="${task.completed ? 'text-decoration: line-through; color: #64748b;' : ''}">
            ${task.title}
          </span>
        </div>
        <span class="status-badge ${task.completed ? 'completed' : 'pending'}">
          ${task.completed ? 'Completed' : 'Pending'}
        </span>
      </li>
    `).join('');

  } catch (error) {
    // 3. Graceful Error Handling (Server offline / CORS / Network failure)
    console.error('Fetch Tasks Error:', error);
    loadingIndicator.style.display = 'none';
    errorMessage.style.display = 'block';
    errorText.textContent = `Error connecting to backend: ${error.message}. Make sure the Node/Express server is running at ${API_BASE_URL}`;
  }
}

// Retry button listener
if (retryBtn) {
  retryBtn.addEventListener('click', fetchTasks);
}

// Fetch on initial page load
document.addEventListener('DOMContentLoaded', fetchTasks);
