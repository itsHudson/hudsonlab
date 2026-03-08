import React from 'react';

const skills = ['SQL', 'Java', 'Python', 'C++', 'HTML', 'CSS', 'SAS', 'GitHub'];

export default function TechGlobe() {
  return (
    <div className="globe-shell">
      <div className="globe-ring globe-ring-1" />
      <div className="globe-ring globe-ring-2" />
      <div className="globe-ring globe-ring-3" />
      <div className="globe-core">
        <div className="globe-inner-grid" />
        <div className="globe-center-label">HUDSONLAB</div>
      </div>
      {skills.map((skill, index) => (
        <span
          key={skill}
          className="floating-skill"
          style={{
            transform: `rotate(${index * 45}deg) translateY(-180px) rotate(${-index * 45}deg)`
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
