import React from 'react';

export default function ProjectPreview({ project, active, onOpen }) {
  return (
    <button className={`project-preview ${active ? 'active' : ''}`} onClick={onOpen}>
      <div>
        <strong>{project.title}</strong>
        <p>{project.summary}</p>
      </div>
      <span>View More</span>
    </button>
  );
}
