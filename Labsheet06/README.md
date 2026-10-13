# Lab Sheet 6: Full Backend Integration (Node.js + Express.js + REST APIs)
**COER University, Roorkee — Department of Computer Science & Engineering**  
**Course:** Full Stack Web Development (Backend-to-Frontend Pipeline)

---

## 📌 Architecture & Subfolder Structure

```
Labsheet06/
├── server/                          # Backend Express REST API Server
│   ├── .env                         # Server environment config (PORT=5000, API_KEY=mysecretkey123)
│   ├── .gitignore                   # Ignores node_modules/ and .env
│   ├── package.json                 # express, cors, dotenv, nodemon
│   └── server.js                    # 5 CRUD routes, logging middleware, auth middleware, 404 & error handlers
│
├── client/                          # Plain JavaScript Client (Q3)
│   ├── index.html                   # HTML structure with loading & error UI
│   ├── style.css                    # Responsive styling, loading spinner & error cards
│   └── script.js                    # Native fetch() integration with 3-state logic
│
├── client-react/                    # React Vite Client (Q4 & Q5)
│   ├── .env                         # Client environment config (VITE_API_URL, VITE_API_KEY)
│   ├── package.json                 # React 19, Axios, Vite
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       └── components/
│           └── TaskList.jsx         # Full 3-state pattern, Axios vs fetch comparison, POST & DELETE handlers
│
├── api-lab.postman_collection.json  # Postman Collection v2.1 export (Q2)
└── README.md                        # Complete Documentation & Test Results
```

---

## 🚀 Q1: REST API Server Implementation (`server/server.js`)
- **Port:** `5000` (Loaded via `process.env.PORT` with 5000 fallback).
- **In-Memory Tasks Database:** 5 initial task objects (`id`, `title`, `completed`).
- **5 CRUD Routes:**
  1. `GET /api/tasks` — Returns all tasks.
  2. `GET /api/tasks/:id` — Returns single task or 404 JSON error.
  3. `POST /api/tasks` — Validates title, auto-increments ID, protected by `x-api-key`.
  4. `PUT /api/tasks/:id` — Updates title/completion, protected by `x-api-key`.
  5. `DELETE /api/tasks/:id` — Removes task, protected by `x-api-key`.
- **Global Logger Middleware:** Logs `[timestamp] METHOD URL` for every incoming request.
- **Protected Auth Middleware:** Checks `req.headers['x-api-key'] === process.env.API_KEY`. Missing or mismatched keys return `401 Unauthorized`.

---

## 🔒 Q2: Securing, Testing & Postman Collection
- **CORS Support:** `cors()` enabled globally.
- **CORS Error Demonstration:** Disabling CORS in backend results in:
  > `Access to fetch at 'http://localhost:5000/api/tasks' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
  Re-enabling `app.use(cors())` solves this instantly.
- **Postman Collection:** Exported to `api-lab.postman_collection.json`.
- **Centralized Error Handling:**
  - 404 route handler returns `{ success: false, status: 404, error: "Cannot GET /xyz - Endpoint not found." }`.
  - 4-parameter error middleware `(err, req, res, next)` handles thrown errors consistently.

---

## 🌐 Q3: Plain JavaScript Client (`client/`)
- Open `client/index.html` in browser.
- **Loading State:** Displays animated loading spinner while fetching.
- **Error State:** If backend server is offline, catches error and displays red error banner with a **"Retry Connection"** button instead of breaking.

---

## ⚛️ Q4 & Q5: React Client with Full 3-State Pattern (`client-react/`)
- **3-State Pattern in `TaskList.jsx`:**
  - `loading`: Shows loading indicator.
  - `error`: Shows clear error alert with retry button.
  - `data` (`tasks`): Renders task cards with status badges.
- **Axios vs Native Fetch Comparison:**
  ```javascript
  // 1. Native fetch: Manual json parsing & manual status code check
  const res = await fetch(`${API_URL}/tasks`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  // 2. Axios: Auto JSON parsing & automatic non-2xx status rejection
  const res = await axios.get(`${API_URL}/tasks`);
  const data = res.data; // Already parsed JSON
  ```
- **Form POST:** Controlled input sending `x-api-key` header and updating UI immediately without page reload.
- **Task Deletion:** Instant removal from state upon server confirmation.
- **Graceful Error Handling:** Clicking **"Test Invalid Delete (ID: 9999)"** cleanly shows:
  `⚠️ Delete failed: Task with id 9999 not found. Cannot delete.`

---

## 🏃 Quick Start Guide

### Step 1: Start Express API Server
```powershell
cd "d:\Full Stack\Labsheet06\server"
npm run dev
# Server starts at http://localhost:5000/api/tasks
```

### Step 2: Open Plain JS Client
Double-click `d:\Full Stack\Labsheet06\client\index.html` in your browser.

### Step 3: Run React Client
```powershell
cd "d:\Full Stack\Labsheet06\client-react"
npm run dev
# React app opens at http://localhost:5173
```
