/**
 * ==============================================================================
 * Lab Sheet 6: Full Backend Integration (Node.js + Express.js REST API)
 * File: server/server.js
 * Features:
 * - 5 In-Memory CRUD Endpoints for Tasks (/api/tasks)
 * - Custom Global Logging Middleware
 * - Custom Protected Route Auth Middleware (x-api-key header)
 * - CORS Enabled
 * - Centralized 404 Handler & 4-Parameter Error Handling Middleware
 * ==============================================================================
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY || 'mysecretkey123';

// 1. Core Global Middleware
app.use(express.json());
app.use(cors()); // CORS enabled for client integration

// 2. Custom Global Logger Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// 3. In-Memory Task Database (At least 5 initial tasks)
let tasks = [
  { id: 1, title: 'Review Node.js & Express fundamentals', completed: true },
  { id: 2, title: 'Build RESTful API endpoints for tasks', completed: true },
  { id: 3, title: 'Configure CORS and custom auth middleware', completed: true },
  { id: 4, title: 'Consume API from Plain JavaScript client', completed: false },
  { id: 5, title: 'Integrate with React single-page frontend', completed: false }
];

let nextId = 6;

// 4. Custom Auth-Check Middleware (Requires 'x-api-key' header)
const requireApiKey = (req, res, next) => {
  const clientKey = req.headers['x-api-key'];

  if (!clientKey) {
    return res.status(401).json({
      success: false,
      status: 401,
      error: 'Unauthorized: Missing required "x-api-key" header.'
    });
  }

  if (clientKey !== API_KEY) {
    return res.status(401).json({
      success: false,
      status: 401,
      error: 'Unauthorized: Invalid "x-api-key" provided.'
    });
  }

  next(); // Authentication passed
};

// 5. REST API CRUD Routes

// Route 1: GET /api/tasks (Public - Read All Tasks)
app.get('/api/tasks', (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// Route 2: GET /api/tasks/:id (Public - Read Single Task by ID)
app.get('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      status: 404,
      error: `Task with id ${taskId} does not exist.`
    });
  }

  res.status(200).json({
    success: true,
    data: task
  });
});

// Route 3: POST /api/tasks (Protected - Create New Task)
app.post('/api/tasks', requireApiKey, (req, res, next) => {
  try {
    const { title, completed } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: 'Validation Error: "title" is required and cannot be empty.'
      });
    }

    const newTask = {
      id: nextId++,
      title: title.trim(),
      completed: Boolean(completed) || false
    };

    tasks.push(newTask);

    res.status(201).json({
      success: true,
      message: 'Task created successfully.',
      data: newTask
    });
  } catch (err) {
    next(err);
  }
});

// Route 4: PUT /api/tasks/:id (Protected - Update Existing Task)
app.put('/api/tasks/:id', requireApiKey, (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: `Task with id ${taskId} not found. Cannot update.`
      });
    }

    const { title, completed } = req.body;

    if (title !== undefined) {
      if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({
          success: false,
          status: 400,
          error: 'Validation Error: "title" cannot be an empty string.'
        });
      }
      tasks[taskIndex].title = title.trim();
    }

    if (completed !== undefined) {
      tasks[taskIndex].completed = Boolean(completed);
    }

    res.status(200).json({
      success: true,
      message: `Task ${taskId} updated successfully.`,
      data: tasks[taskIndex]
    });
  } catch (err) {
    next(err);
  }
});

// Route 5: DELETE /api/tasks/:id (Protected - Delete Task)
app.delete('/api/tasks/:id', requireApiKey, (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: `Task with id ${taskId} not found. Cannot delete.`
      });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.status(200).json({
      success: true,
      message: `Task ${taskId} removed successfully.`,
      data: deletedTask
    });
  } catch (err) {
    next(err);
  }
});

// 6. Centralized 404 Handler for Unmatched Routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    error: `Cannot ${req.method} ${req.url} - Endpoint not found.`
  });
});

// 7. Centralized 4-Parameter Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Centralized Error Caught:', err.stack);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    status: status,
    error: err.message || 'Internal Server Error'
  });
});

// 8. Start the Server
app.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🚀 Task Manager REST API Server is running on port ${PORT}`);
  console.log(`📍 Base URL: http://localhost:${PORT}/api/tasks`);
  console.log(`🔑 Required Auth Header: x-api-key: ${API_KEY}`);
  console.log('====================================================');
});

module.exports = app;
