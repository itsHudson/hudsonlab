import React from "react";

export default function ProjectDetail({ project }) {
  return (
    <div className="glass-card project-detail-panel">
      <h2>{project.name}</h2>
      <p className="project-detail-summary">{project.summary}</p>

      <div className="project-detail-grid">
        <div className="info-box glass-card">
          <h3>Technologies</h3>
          <p>{project.technologies.join(", ")}</p>
        </div>

        <div className="info-box glass-card">
          <h3>GitHub</h3>
          <p>{project.github || "To be added"}</p>
        </div>
      </div>

      <div className="glass-card info-box">
        <h3>Key Features</h3>
        <ul className="info-list">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}