import React from 'react';

export default function ProjectPanel({ project, active, onSelect }) {
  return (
    <button className={`project-panel glass-panel ${active ? 'active' : ''}`} onClick={onSelect}>
      <span className="project-stack">{project.stack}</span>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
    </button>
  );
}
