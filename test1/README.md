# COER UNIVERSITY, ROORKEE
## Department of Computer Science & Engineering
### Full Stack Web Development — Frontend Practical Test Solutions

- **Course:** Full Stack Web Development
- **Time:** 60 Minutes
- **Total Marks:** 20 (4 Marks per Question)
- **Type:** 100% Practical React JSX Implementation

---

## Table of Contents
1. [Project Overview & How to Run](#project-overview--how-to-run)
2. [Q1. Counter (4 Marks)](#q1-counter-4-marks)
3. [Q2. Todo List (4 Marks)](#q2-todo-list-4-marks)
4. [Q3. Login Toggle (4 Marks)](#q3-login-toggle-4-marks)
5. [Q4. Live Search Filter (4 Marks)](#q4-live-search-filter-4-marks)
6. [Q5. Stopwatch (4 Marks)](#q5-stopwatch-4-marks)

---

## Project Overview & How to Run

This project contains modular React JSX solutions for all 5 questions. Each solution is built as a separate component inside `src/components/`, and they are all integrated into an interactive dashboard in `src/App.jsx`.

### Directory Structure
```
test1/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    └── components/
        ├── Counter.jsx          # Solution for Q1
        ├── TodoList.jsx         # Solution for Q2
        ├── LoginToggle.jsx      # Solution for Q3
        ├── LiveSearchFilter.jsx # Solution for Q4
        └── Stopwatch.jsx        # Solution for Q5
```

### Steps to Run
```bash
cd test1
npm install
npm run dev
```
Open `http://localhost:3000` in your web browser to view and interact with all components.

---

## Q1. Counter [4 Marks]

### Problem Statement
> Build a component with Increment, Decrement, and Reset buttons showing a running count.
> The Decrement button should become unusable once the count reaches 0.

### Key Logic & Features
1. **State:** Uses `useState(0)` to track the running count.
2. **Increment:** Adds 1 to count (`setCount(prev => prev + 1)`).
3. **Decrement:** Decreases count only when `count > 0`.
4. **Button Usability:** The Decrement button has the HTML attribute `disabled={count === 0}` so it cannot be clicked once the count reaches 0.
5. **Reset:** Resets count back to 0 (`setCount(0)`).

### Component File: `src/components/Counter.jsx`
```jsx
import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => {
    if (count > 0) setCount((prev) => prev - 1);
  };
  const reset = () => setCount(0);

  return (
    <div className="card">
      <h2>Counter Component</h2>
      <div className="counter-display">
        <span>Current Count: {count}</span>
      </div>
      <div className="button-group">
        <button className="btn btn-success" onClick={increment}>
          + Increment
        </button>
        <button
          className="btn btn-danger"
          onClick={decrement}
          disabled={count === 0}
        >
          - Decrement
        </button>
        <button className="btn btn-secondary" onClick={reset} disabled={count === 0}>
          Reset
        </button>
      </div>
    </div>
  );
}
```

---

## Q2. Todo List [4 Marks]

### Problem Statement
> Build a component with a text input, an Add button, and a list of the entered items below it.
> Each item in the list should have its own Delete button that removes only that item.

### Key Logic & Features
1. **Controlled Input:** Manages `inputVal` state updated via `onChange`.
2. **Add Item:** Validates non-empty input, assigns unique `id: Date.now()`, and appends to `todos` array state using `[...prev, newTodo]`. Clears input on submission.
3. **Delete Item:** Filters out only the targeted item by id: `todos.filter(item => item.id !== idToDelete)`.
4. **Empty State:** Displays a fallback message when no items are present.

### Component File: `src/components/TodoList.jsx`
```jsx
import React, { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState('');

  const handleAddTodo = (e) => {
    e?.preventDefault();
    if (!inputVal.trim()) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: inputVal.trim() }]);
    setInputVal('');
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="card">
      <h2>Todo List</h2>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Enter todo item..."
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            <span>{item.text}</span>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Q3. Login Toggle [4 Marks]

### Problem Statement
> Build a component that shows a Login button initially.
> Once clicked, it should instead show a welcome message and a Logout button, switching back and forth correctly.

### Key Logic & Features
1. **Conditional State:** Uses boolean state `isLoggedIn` initialized to `false`.
2. **Initial View (`false`):** Shows "Log In" button.
3. **Authenticated View (`true`):** Shows welcome message ("Welcome back, Student!") and a "Log Out" button.
4. **Toggle:** Clicking either button toggles state via `setIsLoggedIn(prev => !prev)`.

### Component File: `src/components/LoginToggle.jsx`
```jsx
import React, { useState } from 'react';

export default function LoginToggle() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="card">
      <h2>Login Toggle</h2>
      {isLoggedIn ? (
        <div>
          <h3>Welcome back, Student!</h3>
          <button onClick={() => setIsLoggedIn(false)}>Log Out</button>
        </div>
      ) : (
        <div>
          <p>Please log in to continue.</p>
          <button onClick={() => setIsLoggedIn(true)}>Log In</button>
        </div>
      )}
    </div>
  );
}
```

---

## Q4. Live Search Filter [4 Marks]

### Problem Statement
> Given a hardcoded list of at least 8 names, build a search box that filters the list on every keystroke.
> Display 'No results found' when nothing matches the typed text.

### Key Logic & Features
1. **Hardcoded List:** Contains 10 names (satisfies $\ge 8$ requirement).
2. **Live Keystroke Filter:** Query state `searchQuery` updates on every `onChange` event.
3. **Case-Insensitive Match:** Uses `.toLowerCase().includes(query.toLowerCase().trim())`.
4. **No Results Message:** If `filteredNames.length === 0`, renders `"No results found"`.

### Component File: `src/components/LiveSearchFilter.jsx`
```jsx
import React, { useState } from 'react';

const NAMES = [
  'Aarav Sharma', 'Ananya Verma', 'Rohan Patel', 'Priya Singh',
  'Vikram Malhotra', 'Sneha Gupta', 'Amit Kumar', 'Neha Joshi',
  'Rahul Mehta', 'Pooja Choudhary'
];

export default function LiveSearchFilter() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = NAMES.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="card">
      <h2>Live Search Filter</h2>
      <input
        type="text"
        placeholder="Type to search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filtered.length > 0 ? (
        <ul>
          {filtered.map((name, i) => <li key={i}>{name}</li>)}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
```

---

## Q5. Stopwatch [4 Marks]

### Problem Statement
> Build a stopwatch showing elapsed seconds, with Start, Pause, and Reset buttons.
> Pausing and resuming should not cause the timer to speed up or run inaccurately.

### Key Logic & Features
1. **Accuracy & Cleanup:** Uses `useEffect` with `isRunning` dependency.
2. **Preventing Speed-Up Bug:** When an interval is started without clearing previous intervals, multiple timers tick concurrently causing the stopwatch to run at 2x, 3x speed. To fix this:
   - When `isRunning` is true, a single `setInterval` is started.
   - The cleanup return function `return () => clearInterval(timerId)` ensures the old interval is destroyed whenever paused, resumed, or unmounted.
3. **Buttons:**
   - **Start:** Sets `isRunning = true`.
   - **Pause:** Sets `isRunning = false` (interval cleared, elapsed seconds preserved).
   - **Reset:** Sets `isRunning = false` and `seconds = 0`.

### Component File: `src/components/Stopwatch.jsx`
```jsx
import React, { useState, useEffect } from 'react';

export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerId = null;
    if (isRunning) {
      timerId = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isRunning]);

  return (
    <div className="card">
      <h2>Stopwatch</h2>
      <div>Elapsed: {seconds} seconds</div>
      <button onClick={() => setIsRunning(true)} disabled={isRunning}>Start</button>
      <button onClick={() => setIsRunning(false)} disabled={!isRunning}>Pause</button>
      <button onClick={() => { setIsRunning(false); setSeconds(0); }}>Reset</button>
    </div>
  );
}
```
