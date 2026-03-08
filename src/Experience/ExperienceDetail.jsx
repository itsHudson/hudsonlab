import React from 'react';

export default function ExperienceDetail({ item }) {
  return (
    <section className="panel experience-detail-panel">
      <div className="experience-detail-top">
        <div>
          <div className="section-kicker">Role Detail</div>
          <h2>{item.company}</h2>
          <p className="experience-role-line">{item.role} • {item.period}</p>
        </div>
        <img src={item.image} alt={item.company} className="experience-detail-image" />
      </div>

      <p className="experience-detail-text">{item.summary}</p>

      <div className="experience-columns">
        <div>
          <strong>Responsibilities</strong>
          <ul>
            {item.responsibilities.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Highlights</strong>
          <ul>
            {item.highlights.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
