import React from 'react';

const skills = [
  { name: 'SQL', angle: 0 },
  { name: 'Java', angle: 60 },
  { name: 'Python', angle: 120 },
  { name: 'C++', angle: 180 },
  { name: 'HTML', angle: 240 },
  { name: 'CSS', angle: 300 },
];

export default function TechGlobe() {
  return (
    <div className="globe-shell">
      <div className="globe-ring globe-ring-4" />
      <div className="globe-ring globe-ring-3" />
      <div className="globe-ring globe-ring-2" />
      <div className="globe-ring globe-ring-1" />

      {skills.map((skill) => (
        <div
          key={skill.name}
          className="floating-skill"
          style={{
            '--skill-rotate': `${skill.angle}deg`,
            transform: `rotate(${skill.angle}deg) translateY(-205px)`,
          }}
        >
          {skill.name}
        </div>
      ))}

      <div className="globe-core">
        <div className="globe-inner-grid" />
        <div className="globe-center-label">
          <strong>TECH CORE</strong>
          <span>System Builder</span>
        </div>
      </div>
    </div>
  );
}