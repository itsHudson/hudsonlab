import React from 'react';

export default function ProjectDetail({ project }) {
  return (
    <section className="panel project-detail-panel">
      <div className="section-kicker">Project Detail</div>
      <h2>{project.title}</h2>
      <p className="project-detail-intro">{project.detail}</p>

      <div className="project-detail-block">
        <strong>Core Features</strong>
        <ul>
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="project-detail-block">
        <strong>Technology Used</strong>
        <div className="skill-meta-row">
          {project.tech.map((item) => (
            <span key={item} className="tag">{item}</span>
          ))}
        </div>
      </div>

      <div className="project-detail-links">
        <a className="glow-button primary" href={project.github} target="_blank" rel="noreferrer">
          GitHub Repository
        </a>
      </div>
    </section>
  );
}
