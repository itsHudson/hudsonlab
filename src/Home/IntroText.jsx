import React from 'react';
import GlowButton from '../Shared/GlowButton';

export default function IntroText({ onNavigate }) {
  return (
    <div className="intro-panel glass-panel">
      <span className="intro-chip">Hudson Chia • ENTJ • Data Analytics</span>
      <h1>
        Building a <span>living portfolio</span>, not a static page.
      </h1>
      <p>
        A navy-and-cyan interactive universe that reflects strategy, systems thinking,
        technical curiosity, and real-world execution.
      </p>
      <div className="intro-actions">
        <GlowButton onClick={() => onNavigate('About')}>Enter Orbit</GlowButton>
        <GlowButton ghost onClick={() => onNavigate('Projects')}>
          Explore Projects
        </GlowButton>
      </div>
      <div className="intro-stats">
        <div>
          <strong>APU</strong>
          <span>Computer Science · Data Analytics</span>
        </div>
        <div>
          <strong>Strategy</strong>
          <span>Leadership · Systems · Execution</span>
        </div>
      </div>
    </div>
  );
}
