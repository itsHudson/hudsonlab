import React from 'react';

const orbitItems = [
  { label: 'About', top: '12%', left: '50%', page: 'about', lineRotate: '180deg' },
  { label: 'Skills', top: '28%', left: '84%', page: 'skills', lineRotate: '-120deg' },
  { label: 'Projects', top: '72%', left: '84%', page: 'projects', lineRotate: '-58deg' },
  { label: 'Education', top: '88%', left: '50%', page: 'education', lineRotate: '0deg' },
  { label: 'Experience', top: '72%', left: '16%', page: 'experience', lineRotate: '58deg' },
  { label: 'Certs', top: '28%', left: '16%', page: 'certifications', lineRotate: '120deg' },
];

export default function OrbitMenu({ onNavigate }) {
  return (
    <div className="orbit-menu">
      {orbitItems.map((item) => (
        <button
          key={item.label}
          className="orbit-node"
          style={{ top: item.top, left: item.left }}
          onClick={() => onNavigate(item.page)}
          aria-label={`Go to ${item.label}`}
        >
          <span
            className="orbit-node-line"
            style={{ transform: `translateX(-50%) rotate(${item.lineRotate})` }}
          />
          <span className="orbit-node-core" />
          <span className="orbit-node-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}