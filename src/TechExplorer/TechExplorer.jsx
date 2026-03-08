import React, { useMemo, useState } from "react";
import "./techexplorer.css";
import skills from "../Data/skills";
import projects from "../Data/projects";
import SkillOrbit from "./SkillOrbit";
import SkillDetailPanel from "./SkillDetailPanel";
import ProjectDetail from "./ProjectDetail";

export default function TechExplorer() {
  const [selectedSkillId, setSelectedSkillId] = useState(skills[0].id);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const selectedSkill = useMemo(
    () => skills.find((skill) => skill.id === selectedSkillId),
    [selectedSkillId]
  );

  const relatedProjects = useMemo(
    () =>
      projects.filter((project) =>
        project.skills.includes(selectedSkillId)
      ),
    [selectedSkillId]
  );

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) || null,
    [selectedProjectId]
  );

  return (
    <section className="page-section">
      <span className="small-chip">Tech Explorer</span>
      <h1 className="page-title">Skills Connected to Real Projects</h1>
      <p className="page-subtitle">
        This section combines skills and projects. Click a skill in the orbit
        to view the related project work.
      </p>

      <div className="te-layout">
        <SkillOrbit
          skills={skills}
          selectedSkillId={selectedSkillId}
          onSelectSkill={(id) => {
            setSelectedSkillId(id);
            setSelectedProjectId(null);
          }}
        />

        <SkillDetailPanel
          skill={selectedSkill}
          projects={relatedProjects}
          onSelectProject={(id) => setSelectedProjectId(id)}
        />
      </div>

      {selectedProject && <ProjectDetail project={selectedProject} />}
    </section>
  );
}