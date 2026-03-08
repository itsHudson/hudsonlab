import React from 'react';

const orbitItems = [
  { label: 'About', top: '8%', left: '49%' },
  { label: 'Skills', top: '24%', left: '79%' },
  { label: 'Projects', top: '62%', left: '84%' },
  { label: 'Education', top: '85%', left: '57%' },
  { label: 'Experience', top: '73%', left: '12%' },
  { label: 'Certifications', top: '29%', left: '8%' }
];

export default function OrbitMenu({ onNavigate }) {
  return (
    <div className="orbit-menu">
      {orbitItems.map((item, index) => (
        <button
          key={item.label}
          className="orbit-node"
          style={{ top: item.top, left: item.left, animationDelay: `${index * 0.9}s` }}
          onClick={() => onNavigate(item.label)}
        >
          <span className="orbit-node-core" />
          <span className="orbit-node-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
