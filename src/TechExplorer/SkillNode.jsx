import React from 'react';

export default function SkillNode({ skill, angle, active, onClick }) {
  return (
    <button
      className={`skill-node ${active ? 'active' : ''}`}
      style={{ '--angle': `${angle}deg` }}
      onClick={onClick}
      aria-label={`View ${skill.label}`}
    >
      <span className="skill-node-logo">{skill.logo}</span>
      <span className="skill-node-label">{skill.label}</span>
    </button>
  );
}
