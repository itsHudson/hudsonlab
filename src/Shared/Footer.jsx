import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer-shell">
      <div className="footer-inner">
        <p>Built for GitHub Pages with React, CSS, and JavaScript.</p>
        <div className="footer-links">
          <button className="glow-button" onClick={() => onNavigate('about')}>About</button>
          <button className="glow-button" onClick={() => onNavigate('techexplorer')}>Tech Explorer</button>
          <button className="glow-button" onClick={() => onNavigate('contact')}>Contact</button>
        </div>
      </div>
    </footer>
  );
}
