import React from 'react';

export default function GoalsSection({ onNavigate }) {
  return (
    <section className="panel goals-panel">
      <div>
        <div className="section-kicker">Direction</div>
        <h2>Current Goals</h2>
        <p>
          Continue growing in system design, technical implementation, data-oriented thinking, and
          professional portfolio presentation while connecting each skill to real project evidence.
        </p>
      </div>

      <div className="goals-actions">
        <button className="glow-button primary" onClick={() => onNavigate('techexplorer')}>
          Go to Tech Explorer
        </button>
        <button className="glow-button" onClick={() => onNavigate('experience')}>
          View Experience
        </button>
      </div>
    </section>
  );
}
