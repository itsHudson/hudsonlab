import React from 'react';

const links = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Tech Explorer', page: 'techexplorer' },
  { label: 'Experience', page: 'experience' },
  { label: 'Education', page: 'education' },
  { label: 'Certifications', page: 'certifications' },
  { label: 'Contact', page: 'contact' },
];

export default function Navbar({ currentPage, onNavigate }) {
  return (
    <header className="navbar">
      <button className="brand-mark" onClick={() => onNavigate('home')} aria-label="Go to home">
        <span className="brand-dot" />
        <span className="brand-copy">
          <strong>HUDSONLAB</strong>
          <span>Interactive Portfolio</span>
        </span>
      </button>

      <nav className="nav-links">
        {links.map((link) => (
          <button
            key={link.page}
            className={`nav-link ${currentPage === link.page ? 'active' : ''}`}
            onClick={() => onNavigate(link.page)}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
