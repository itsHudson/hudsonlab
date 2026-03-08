import React from 'react';
import entjImage from '../Images/MBTI_ENTJ.png';

const traits = [
  { label: 'Leadership', value: '95%' },
  { label: 'Strategy', value: '93%' },
  { label: 'Execution', value: '90%' },
  { label: 'Analysis', value: '88%' }
];

export default function PersonalityENTJ() {
  return (
    <article className="glass-panel personality-panel">
      <div className="personality-header">
        <div>
          <span className="mini-tag">Personality Lens</span>
          <h3>ENTJ</h3>
        </div>
        <img src={entjImage} alt="ENTJ" />
      </div>
      <p>
        ENTJ reflects my preferred style: take initiative, create structure, improve
        systems, and move ideas into action with clarity.
      </p>
      <div className="trait-list">
        {traits.map((trait) => (
          <div key={trait.label} className="trait-row">
            <div className="trait-top">
              <span>{trait.label}</span>
              <span>{trait.value}</span>
            </div>
            <div className="trait-bar">
              <span style={{ width: trait.value }} />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
