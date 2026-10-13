# Lab Sheet 5: Express.js Server Setup, Routing & Middleware
**COER University, Roorkee — Department of Computer Science & Engineering**  
**Course:** Full Stack Web Development (Backend Fundamentals with Express.js)

---

## 📌 Overview & Directory Structure

```
Labsheet05/
├── .env                 # Server environment configuration (PORT=4000)
├── package.json         # express, dotenv, nodemon
├── index.js             # Main server file with basic routes, middleware, and router mounts
├── public/
│   ├── index.html       # Static home page served via express.static
│   └── style.css        # Clean responsive styles
├── routes/
│   ├── students.js      # Part C & F: /api/students/:id router
│   ├── books.js         # Full CRUD operations for Books (/api/books)
│   └── members.js       # Full CRUD operations for Members (/api/members)
├── test-api.js          # Automated end-to-end route verification script
└── README.md            # Comprehensive documentation & test outputs
```

---

## 🛠️ Components & Route Implementation

### 1. Environment & Package Configuration
- **Port:** `4000` (Defined in `.env`, loaded via `process.env.PORT || 4000`).
- **Dependencies:** `express (^4.19.2)`, `dotenv (^16.4.5)`, and `nodemon (^3.1.0)`.

### 2. Static Assets (`public/`)
- Express serves static files from `public/` using:
  ```javascript
  app.use(express.static(path.join(__dirname, 'public')));
  ```
- Visiting `http://localhost:4000/` renders `index.html` styled with `style.css`.

### 3. Middleware Implementation
- **Body Parsers:** `express.json()` and `express.urlencoded({ extended: true })`.
- **Global Custom Logger:** Logs `[timestamp] METHOD URL` for every incoming request.
- **Admin API Key Middleware (`checkApiKey`):**
  Checks for `x-api-key` header on protected endpoints (`/admin/dashboard`). If missing, returns:
  `403 Forbidden: Missing x-api-key header`.

### 4. Route Endpoints Implemented

| Part | Route | Method | Description |
|---|---|---|---|
| **A & B** | `/` | GET | Renders static index.html / text |
| **A & B** | `/about` | GET | Returns JSON with student name & roll number |
| **A & B** | `/courses` | GET | Returns JSON array of 3 registered courses |
| **A & B** | `/echo` | POST | Echoes back received JSON body |
| **C** | `/search?name=...&age=...` | GET | Reads query parameters from `req.query` |
| **C** | `/products/:category/:id` | GET | Reads path parameters from `req.params` |
| **D** | `/admin/dashboard` | GET | Protected route requiring `x-api-key` |
| **E** | `/register` | POST | Handles registration form submission |
| **E** | `/contact` | POST | Handles contact message submissions |
| **F & J** | `/api/students/:id` | GET | Student details router |
| **F & J** | `/api/books` | CRUD | Full in-memory CRUD (GET all, GET by id, POST, PUT, DELETE) |
| **F & J** | `/api/members` | CRUD | Full in-memory CRUD (GET all, GET by id, POST, PUT, DELETE) |
| **H** | 404 Handler | ANY | Returns `{ "error": "Route not found" }` for unmatched routes |
| **H** | Centralized Error Handler | ANY | 4-parameter error handler returning `{ error: { message, status } }` |

---

## 🏃 How to Run & Test

### Step 1: Start the Server
```powershell
cd "d:\Full Stack\Labsheet05"
npm start
# Server runs on http://localhost:4000
```

### Step 2: Test All Endpoints Automatically
In a second terminal:
```powershell
cd "d:\Full Stack\Labsheet05"
node test-api.js
```

### Step 3: Browser / Thunder Client Testing
- Open `http://localhost:4000/` to view the styled HTML page.
- Open `http://localhost:4000/about` to view the JSON output.
- Test `http://localhost:4000/api/books/999` with header `x-api-key: 12345` to see the custom 404 error response:
  ```json
  {
    "error": {
      "message": "Book not found",
      "status": 404
    }
  }
  ```
