import React, { useState } from 'react';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import LoginToggle from './components/LoginToggle';
import LiveSearchFilter from './components/LiveSearchFilter';
import Stopwatch from './components/Stopwatch';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Questions' },
    { id: 'q1', label: 'Q1: Counter' },
    { id: 'q2', label: 'Q2: Todo List' },
    { id: 'q3', label: 'Q3: Login Toggle' },
    { id: 'q4', label: 'Q4: Live Search' },
    { id: 'q5', label: 'Q5: Stopwatch' }
  ];

  return (
    <div className="app-container">
      {/* Test Header */}
      <header className="header">
        <div className="header-badge">COER UNIVERSITY, ROORKEE</div>
        <h1>Department of Computer Science &amp; Engineering</h1>
        <h2>Full Stack Web Development &mdash; Frontend Practical Test</h2>
        <div className="test-meta">
          <span><strong>Total Marks:</strong> 20 (4 Marks &times; 5 Questions)</span>
          <span><strong>Time:</strong> 60 Minutes</span>
          <span><strong>Type:</strong> 100% Practical React JSX</span>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="tab-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <main className="content-grid">
        {(activeTab === 'all' || activeTab === 'q1') && <Counter />}
        {(activeTab === 'all' || activeTab === 'q2') && <TodoList />}
        {(activeTab === 'all' || activeTab === 'q3') && <LoginToggle />}
        {(activeTab === 'all' || activeTab === 'q4') && <LiveSearchFilter />}
        {(activeTab === 'all' || activeTab === 'q5') && <Stopwatch />}
      </main>

      <footer className="footer">
        <p>&copy; COER University &bull; Full Stack Web Development Practical Exam Solutions</p>
      </footer>
    </div>
  );
}
