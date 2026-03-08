import React, { useMemo, useState } from 'react';
import './techexplorer.css';
import skills from '../Data/skills';
import SkillOrbit from './SkillOrbit';
import SkillDetailPanel from './SkillDetailPanel';
import ProjectDetail from './ProjectDetail';

export default function TechExplorer() {
  const [selectedSkillId, setSelectedSkillId] = useState(skills[0].id);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const selectedSkill = useMemo(
    () => skills.find((skill) => skill.id === selectedSkillId) || skills[0],
    [selectedSkillId]
  );

  const selectedProject = useMemo(
    () => selectedSkill.projects.find((project) => project.id === selectedProjectId) || null,
    [selectedProjectId, selectedSkill]
  );

  const handleSkillSelect = (skillId) => {
    setSelectedSkillId(skillId);
    setSelectedProjectId(null);
  };

  return (
    <section className="page-shell">
      <div className="content-wrap tech-wrap">
        <div>
          <div className="section-kicker">Tech Explorer</div>
          <h1 className="page-title">
            Skills + <span>Projects</span>
          </h1>
          <p className="page-intro">
            Skills and projects are intentionally connected here. Click a skill on the orbit to see
            related work, then open a project for more focused detail.
          </p>
        </div>

        <section className="tech-main-grid">
          <SkillOrbit
            skills={skills}
            selectedSkillId={selectedSkillId}
            onSelectSkill={handleSkillSelect}
          />

          <div className="tech-detail-stack">
            <SkillDetailPanel
              skill={selectedSkill}
              onOpenProject={setSelectedProjectId}
              selectedProjectId={selectedProjectId}
            />
            {selectedProject && <ProjectDetail project={selectedProject} />}
          </div>
        </section>
      </div>
    </section>
  );
}
