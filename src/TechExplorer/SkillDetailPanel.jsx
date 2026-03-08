import React from "react";

export default function SkillDetailPanel({ skill, projects, onSelectProject }) {
  return (
    <div className="glass-card skill-panel">
      <div className="skill-header">
        <div className="skill-icon-large">{skill.icon}</div>
        <div>
          <h2>{skill.name}</h2>
          <p>{skill.description}</p>
        </div>
      </div>

      <div className="skill-project-list">
        <h3>Related Projects</h3>

        {projects.length === 0 ? (
          <p className="skill-empty-text">No projects linked yet.</p>
        ) : (
          <div className="project-preview-grid">
            {projects.map((project) => (
              <button
                key={project.id}
                className="project-preview-card"
                onClick={() => onSelectProject(project.id)}
              >
                <strong>{project.name}</strong>
                <span>{project.summary}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}