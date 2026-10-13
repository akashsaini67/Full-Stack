import React from 'react';
import TaskList from './components/TaskList.jsx';

export default function App() {
  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-container">
          <h1>⚡ Task Manager Full-Stack Mini App</h1>
          <span className="badge">COER CSE - Lab Sheet 6</span>
        </div>
      </header>

      <main className="main-content">
        <TaskList />
      </main>

      <footer className="app-footer">
        <p>Lab Sheet 6: Full Backend Integration &bull; Node.js + Express + React + Axios</p>
      </footer>
    </div>
  );
}
