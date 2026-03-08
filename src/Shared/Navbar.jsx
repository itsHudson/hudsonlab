import React, { useState } from 'react';
import GlowButton from './GlowButton';
import './shared.css';

export default function Navbar({ items, activeSection, onNavigate }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-shell">
      <div className="nav-brand" onClick={() => onNavigate('Home')}>
        <span className="nav-brand-main">HUDSONLAB</span>
        <span className="nav-brand-sub">Interactive Orbit Portfolio</span>
      </div>

      <button className="nav-toggle" onClick={() => setOpen((value) => !value)}>
        {open ? 'Close' : 'Menu'}
      </button>

      <nav className={`nav-links ${open ? 'open' : ''}`}>
        {items.map((item) => (
          <button
            key={item}
            className={`nav-link ${activeSection === item ? 'active' : ''}`}
            onClick={() => {
              onNavigate(item);
              setOpen(false);
            }}
          >
            {item}
          </button>
        ))}
        <GlowButton onClick={() => onNavigate('Contact')}>Connect</GlowButton>
      </nav>
    </header>
  );
}
