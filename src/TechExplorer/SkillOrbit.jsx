import React from 'react';
import SkillNode from './SkillNode';

export default function SkillOrbit({ skills, selectedSkillId, onSelectSkill }) {
  return (
    <section className="panel orbit-shell">
      <div className="orbit-stage">
        <div className="orbit-ring orbit-ring-outer" />
        <div className="orbit-ring orbit-ring-mid" />
        <div className="orbit-ring orbit-ring-inner" />
        <div className="orbit-core">
          <strong>TECH</strong>
          <span>Explorer</span>
        </div>

        {skills.map((skill, index) => {
          const angle = (360 / skills.length) * index;
          return (
            <SkillNode
              key={skill.id}
              skill={skill}
              angle={angle}
              active={skill.id === selectedSkillId}
              onClick={() => onSelectSkill(skill.id)}
            />
          );
        })}
      </div>
    </section>
  );
}
