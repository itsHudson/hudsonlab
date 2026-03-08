import React from 'react';
import './skills.css';
import SkillSphere from './SkillSphere';
import SkillNode from './SkillNode';

const skills = [
  { name: 'SQL', description: 'Database querying and data structure logic.' },
  { name: 'Java', description: 'OOP, system simulation, and backend coursework.' },
  { name: 'Python', description: 'Data workflow thinking and practical problem solving.' },
  { name: 'C++', description: 'Fundamental programming and algorithm design.' },
  { name: 'SAS', description: 'Model tuning and data analytics workflow exposure.' },
  { name: 'HTML/CSS', description: 'Modern interface design and front-end structure.' }
];

export default function Skills() {
  return (
    <section className="section-shell">
      <div className="section-header">
        <span className="section-tag">Skills</span>
        <h2 className="section-title">Technical signals floating in one system.</h2>
        <p className="section-subtitle">
          Instead of progress bars, this page uses a skill orbit to visualize the tools
          and strengths that shape Hudson’s technical profile.
        </p>
      </div>

      <div className="skills-layout">
        <SkillSphere />
        <div className="skills-list">
          {skills.map((skill) => (
            <SkillNode key={skill.name} name={skill.name} description={skill.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
