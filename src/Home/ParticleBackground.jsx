import React from 'react';

export default function ParticleBackground() {
  return (
    <div className="particle-layer" aria-hidden="true">
      {Array.from({ length: 34 }).map((_, index) => (
        <span
          key={index}
          className="particle-dot"
          style={{
            left: `${(index * 13) % 100}%`,
            top: `${(index * 19) % 100}%`,
            animationDuration: `${12 + (index % 6) * 3}s`,
            animationDelay: `${(index % 10) * -1.2}s`
          }}
        />
      ))}
    </div>
  );
}
