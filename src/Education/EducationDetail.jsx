import React from 'react';

export default function EducationDetail({ item }) {
  return (
    <section className="panel education-detail-panel">
      <div className="section-kicker">Institution Detail</div>
      <h2>{item.school}</h2>
      <p className="education-detail-subtitle">{item.program} • {item.period}</p>
      <p className="education-detail-text">{item.description}</p>

      <div className="education-list-block">
        <strong>Focus Areas</strong>
        <div className="skill-meta-row">
          {item.focus.map((entry) => (
            <span key={entry} className="tag">{entry}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
