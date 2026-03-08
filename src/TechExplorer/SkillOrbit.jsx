import React from "react";

export default function SkillOrbit({ skills, selectedSkillId, onSelectSkill }) {
  return (
    <div className="glass-card orbit-panel">
      <div className="orbit-shell">
        <div className="orbit-ring orbit-ring-1" />
        <div className="orbit-ring orbit-ring-2" />
        <div className="orbit-core">
          <span>TECH</span>
        </div>

        {skills.map((skill, index) => {
          const angle = (360 / skills.length) * index;
          return (
            <button
              key={skill.id}
              className={`orbit-skill ${selectedSkillId === skill.id ? "active" : ""}`}
              style={{ transform: `rotate(${angle}deg) translateY(-175px) rotate(-${angle}deg)` }}
              onClick={() => onSelectSkill(skill.id)}
            >
              {skill.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
}