import React from 'react';
import GlowButton from '../Shared/GlowButton';

export default function ProjectDetail({ project }) {
  return (
    <article className="project-detail glass-panel">
      <div className="project-detail-visual">
        <div className="project-detail-beam" />
        <div className="project-detail-grid" />
        <span>{project.title}</span>
      </div>
      <div className="project-detail-content">
        <span className="section-tag">Selected Project</span>
        <h3>{project.title}</h3>
        <p>{project.details}</p>
        <div className="project-detail-actions">
          <GlowButton>GitHub Repository</GlowButton>
          <GlowButton ghost>Case Study</GlowButton>
        </div>
      </div>
    </article>
  );
}
