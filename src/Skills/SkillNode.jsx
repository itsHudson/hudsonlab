import React from 'react';

export default function SkillNode({ name, description }) {
  return (
    <article className="glass-panel skill-node-card">
      <div className="skill-node-top">
        <span className="skill-node-ping" />
        <h3>{name}</h3>
      </div>
      <p>{description}</p>
    </article>
  );
}
