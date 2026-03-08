import React from 'react';

export default function IntroText({ onNavigate }) {
  return (
    <div className="intro-panel">
      <div className="intro-chip">
        <span className="intro-chip-dot" />
        Interactive Portfolio Interface
      </div>

      <h1>
        HUDSOn <br />
        <span className="highlight">CHIA</span>
      </h1>

      <div className="intro-role">
        Computer Science Student • Data Analytics • ENTJ
      </div>

      <p>
        I build structured digital systems, data-driven solutions, and technical
        projects with a strong focus on execution, clarity, and practical impact.
        Explore my work through this interactive orbit experience.
      </p>

      <div className="intro-actions">
        <button
          className="glow-btn primary-glow-btn"
          onClick={() => onNavigate('about')}
        >
          Enter Portfolio
        </button>

        <button
          className="glow-btn secondary-glow-btn"
          onClick={() => onNavigate('projects')}
        >
          View Projects
        </button>
      </div>

      <div className="intro-stats">
        <div>
          <strong>Design Direction</strong>
          <span>Futuristic • Navy • Cyan • Interactive</span>
        </div>
        <div>
          <strong>Core Style</strong>
          <span>Strategic thinker with strong execution mindset</span>
        </div>
        <div>
          <strong>Focus Area</strong>
          <span>Data Analytics • Systems • Web Development</span>
        </div>
        <div>
          <strong>Navigation</strong>
          <span>Use orbit nodes to enter each section</span>
        </div>
      </div>
    </div>
  );
}