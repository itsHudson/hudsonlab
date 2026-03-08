import React from 'react';
import ProjectPreview from './ProjectPreview';

export default function SkillDetailPanel({ skill, onOpenProject, selectedProjectId }) {
  return (
    <section className="panel skill-detail-panel">
      <div className="skill-detail-header">
        <div className="skill-detail-badge">{skill.logo}</div>
        <div>
          <div className="section-kicker">Selected Skill</div>
          <h2>{skill.label}</h2>
        </div>
      </div>

      <p className="skill-detail-text">{skill.description}</p>

      <div className="skill-meta-row">
        {skill.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      <div className="projects-header">
        <h3>Related Projects</h3>
        <span>{skill.projects.length} linked item(s)</span>
      </div>

      <div className="project-preview-stack">
        {skill.projects.map((project) => (
          <ProjectPreview
            key={project.id}
            project={project}
            active={project.id === selectedProjectId}
            onOpen={() => onOpenProject(project.id)}
          />
        ))}
      </div>
    </section>
  );
}
