import React from 'react';

const sphereSkills = ['SQL', 'JAVA', 'PYTHON', 'C++', 'SAS', 'HTML', 'CSS', 'GIT'];

export default function SkillSphere() {
  return (
    <div className="glass-panel skill-sphere-panel">
      <div className="skill-sphere">
        <div className="skill-sphere-core">SKILLS</div>
        {sphereSkills.map((skill, index) => (
          <span
            key={skill}
            className="skill-sphere-label"
            style={{
              transform: `rotate(${index * 45}deg) translateY(-150px) rotate(${-index * 45}deg)`
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
