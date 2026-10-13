# Full Stack Web Development — Practical Lab Sheets Repository
**COER UNIVERSITY, ROORKEE**  
**Department of Computer Science & Engineering**

---

## 📂 Complete Repository Index (Lab Sheets 1 to 7)

```
d:/Full Stack/
├── Labsheet01/    # Lab Sheet 1: Building the Storefront (HTML + CSS) [Phases 1 & 2]
├── Labsheet02/    # Lab Sheet 2: Making It Interactive (Vanilla JavaScript) [Phase 3]
├── Labsheet03/    # Lab Sheet 3: Rebuilding with React (Components, Props, useState) [Phase 4]
├── Labsheet04/    # Lab Sheet 4: Node.js Core Modules, APIs & CLI Utilities [12 Tasks]
├── Labsheet05/    # Lab Sheet 5: Express.js Routing, Middleware & Routers (Books, Members, Students)
├── Labsheet06/    # Lab Sheet 6: Full Backend Integration (Node.js + Express.js + React)
└── Labsheet07/    # Lab Sheet 7: Database Management & SQL Queries (college_db)
```

---

### 1. [Labsheet01](file:///D:/Full%20Stack/Labsheet01) — Storefront UI (HTML5 & CSS3)
- **Store Name:** ElectroHub
- **Files:** `index.html`, `products.html`, `product-detail.html`, `cart.html`, `checkout.html`, `style.css`
- **Features:** CSS variables, Flexbox navbar, responsive cards grid, styled form, mobile media queries.

---

### 2. [Labsheet02](file:///D:/Full%20Stack/Labsheet02) — Interactive Storefront (Vanilla JavaScript)
- **Files:** `script.js`, `index.html`, `products.html`, `product-detail.html`, `cart.html`, `checkout.html`, `style.css`
- **Features:** Dynamic catalog rendering, `localStorage` cart persistence, `reduce()` grand total, live navbar badge, inline regex form validation.

---

### 3. [Labsheet03](file:///D:/Full%20Stack/Labsheet03) — Rebuilding with React (Vite SPA)
- **Files:** `App.jsx`, `products.js`, `ProductList.jsx`, `ProductCard.jsx`, `Cart.jsx`, `CheckoutForm.jsx`, `Navbar.jsx`
- **Features:** Lifting state up, functional components with props, unique keys, controlled inputs with `useState`, conditional rendering.

---

### 4. [Labsheet04](file:///D:/Full%20Stack/Labsheet04) — Node.js Core Modules & Utilities
- **Tasks Covered:** Custom modules (`sum.js`, `even-odd.js`, `app1.js`), File system CRUD (`file-ops.js`), Directory ops (`dir-ops.js`), Path module (`path-demo.js`), OS diagnostics (`sys-report.js`), EventEmitter (`order-events.js`), HTTP server routing & query parsing (`server.js`, `query-demo.js`), Streams (`stream-demo.js`), Nanoid (`id-gen.js`), CLI calculator (`calc-cli.js`), Environment variables (`env-demo.js`).
- **Master Test Runner:** `node test-all.js`

---

### 5. [Labsheet05](file:///D:/Full%20Stack/Labsheet05) — Express.js Server Setup, Routing & Middleware
- **Files:** `index.js`, `.env`, `public/index.html`, `public/style.css`, `routes/students.js`, `routes/books.js`, `routes/members.js`, `test-api.js`
- **Features:** Static file serving (`express.static`), global logger middleware, admin API key authentication, route params (`:category/:id`), query strings (`/search`), modular Express routers (`/api/books`, `/api/members`, `/api/students`), 404 handler, and centralized error handling.

---

### 6. [Labsheet06](file:///D:/Full%20Stack/Labsheet06) — Express.js REST API & Client Integration
- **Structure:**
  - `server/`: Express REST API on port 5000 with 5 CRUD routes, global logger, `x-api-key` auth middleware, CORS, centralized 404 & error handlers.
  - `client/`: Plain JavaScript frontend calling `GET /api/tasks` with loading/error handling.
  - `client-react/`: React 19 + Axios/fetch frontend with full 3-state pattern (`loading`, `error`, `data`), task creation, task deletion, and graceful 404/401 handling.
  - `api-lab.postman_collection.json`: Complete Postman export collection covering all endpoints.

---

### 7. [Labsheet07](file:///D:/Full%20Stack/Labsheet07) — Database Management & SQL Queries (`college_db`)
- **Structure:**
  - `schema.sql`: Full schema creation and seed data for `departments`, `students`, `courses`, and `enrollments`.
  - `solutions.sql`: Complete query solutions for Part A (DDL), Part B (DML), Part C (SELECT), Part D (Aggregates), Part E (Joins), Part F (Subqueries), Part G (Indexes, Views, Transactions), and Part H (Challenges).
  - `run-sql.js`: Live execution engine using Node.js built-in `node:sqlite` rendering ASCII tables for every query.
