import React, { useState, useEffect, useRef } from 'react';

/**
 * Q5: Stopwatch Component
 * Marks: 4
 * 
 * Features:
 * - Shows elapsed seconds clearly
 * - Start button (starts or resumes the timer)
 * - Pause button (freezes the timer without resetting)
 * - Reset button (stops the timer and resets elapsed seconds to 0)
 * - Correct interval management with useEffect & clearInterval to prevent
 *   timer drift, duplicate intervals, or speed-up bugs upon pause/resume.
 */
export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Manage interval with useEffect to guarantee exactly one active timer
  // and ensure proper cleanup on pause or unmount.
  useEffect(() => {
    let timerId = null;

    if (isRunning) {
      timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    // Cleanup function: runs whenever isRunning changes or component unmounts.
    // This prevents multiple intervals from stacking and speeding up the timer.
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  // Helper format for MM:SS display
  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="badge">Q5 &bull; 4 Marks</span>
        <h2>Stopwatch Component</h2>
        <p className="description">
          Tracks elapsed seconds. Safe interval cleanup ensures pausing and resuming never speeds up the timer.
        </p>
      </div>

      <div className="stopwatch-display">
        <div className="stopwatch-digits">
          <span className="time-primary">{seconds}</span>
          <span className="time-unit">seconds</span>
        </div>
        <div className="stopwatch-secondary">
          Formatted: <strong>{formatTime(seconds)}</strong>
        </div>
        <div className="stopwatch-status">
          <span className={`status-pill ${isRunning ? 'running' : 'paused'}`}>
            {isRunning ? '&#9654; RUNNING' : '&#10074;&#10074; PAUSED'}
          </span>
        </div>
      </div>

      <div className="button-group">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleStart}
          disabled={isRunning}
        >
          &#9658; Start
        </button>

        <button
          type="button"
          className="btn btn-warning"
          onClick={handlePause}
          disabled={!isRunning}
        >
          &#10074;&#10074; Pause
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={handleReset}
          disabled={seconds === 0 && !isRunning}
        >
          &#8634; Reset
        </button>
      </div>
    </div>
  );
}
