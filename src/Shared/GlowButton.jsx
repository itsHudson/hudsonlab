import React from 'react';

export default function GlowButton({ children, onClick, ghost = false }) {
  return (
    <button className={`glow-button ${ghost ? 'ghost' : ''}`} onClick={onClick}>
      {children}
    </button>
  );
}
